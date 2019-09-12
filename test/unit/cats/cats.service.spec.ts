import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import mockingoose from 'mockingoose';
import * as mongoose from 'mongoose';
import { CatsService } from '../../../src/pages/cats/cats.service';
import { CreateCatDto } from '../../../src/pages/cats/shared/dto/create-cat.dto';
import { ICat } from '../../../src/pages/cats/shared/interfaces/cat.interface';
import { CATS_SCHEMA } from '../../../src/pages/cats/shared/schemas/cat.schema';
import { allCatsResultMock, createCatDtoMock, testMongoId, updateCatDtoMock } from '../../mocks/cats/contants';
import { ModelExecRejectMock } from '../../mocks/mongoose/model-exec-reject.mock';
import { ModelExecResolveMock } from '../../mocks/mongoose/model-exec-resolve.mock';
import { expectObservableIsEMPTY, expectObservableThrowErr } from '../../utils/expect-observable';

describe('CatsService', () => {
  let service: CatsService;
  const createData: CreateCatDto = createCatDtoMock;
  let catModel: mongoose.Model<ICat>;

  beforeEach(async () => {
    mockingoose.resetAll();
    jest.resetAllMocks();
    catModel = mongoose.model('Cat', CATS_SCHEMA);
    const nestModule: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'CatModel',
          useValue: catModel,
        },
        CatsService,
      ],
    }).compile();
    service = nestModule.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('add: should create database model and call save method once', () => {
    catModel.prototype.save = jest.fn();
    service.add(createData);
    expect(catModel.prototype.save).toBeCalledTimes(1);
  });

  it('add: should transfer data from DB model to response', (done) => {
    jest.spyOn(catModel.prototype, 'save').mockImplementationOnce(() => Promise.resolve({id: testMongoId}));
    const result = service.add(createData);
    result.subscribe(val => {
      expect(val).toEqual(testMongoId);
      done();
    });
  });

  it('add: should throw 500 error on Promise reject', (done) => {
    jest.spyOn(catModel.prototype, 'save').mockImplementationOnce(() => Promise.reject('error'));
    const result = service.add(createData);
    expectObservableThrowErr(result, InternalServerErrorException, done);
  });

  it('findOne: should call fundOne once', () => {
    catModel.findOne = jest.fn();
    try {
      service.findOne(testMongoId);
    } catch (err) {
    }
    expect(catModel.findOne).toBeCalledTimes(1);
    expect(catModel.findOne).toBeCalledWith({ _id: testMongoId }, undefined, undefined, undefined);
  });

  it('findOne: should transfer data from DB model to response ', (done) => {
    jest.spyOn(catModel, 'findOne').mockImplementationOnce((id) => new ModelExecResolveMock({...createData, _id: id._id}) as any);
    const result = service.findOne(testMongoId);
    result.subscribe(val => {
      expect(val).toEqual({ ...createCatDtoMock, _id: testMongoId });
      done();
    });
  });

  it('findOne: should throw 404 on null data', (done) => {
    jest.spyOn(catModel, 'findOne').mockImplementationOnce(() => new ModelExecResolveMock(null) as any);
    const result = service.findOne(testMongoId);
    expectObservableThrowErr(result, NotFoundException, done);
  });

  it('findOne: should throw 500 on db error', (done) => {
    jest.spyOn(catModel, 'findOne').mockImplementationOnce(() => new ModelExecRejectMock(null) as any);
    const result = service.findOne(testMongoId);
    expectObservableThrowErr(result, InternalServerErrorException, done);
  });

  it('findAll: should call find method once', () => {
    catModel.find = jest.fn();
    try {
      service.findAll();
    } catch (err) {
    }
    expect(catModel.find).toBeCalledTimes(1);
  });

  it('findAll: should return array of cats', (done) => {
    jest.spyOn(catModel, 'find').mockImplementationOnce(() => new ModelExecResolveMock(allCatsResultMock) as any);
    const result = service.findAll();
    result.subscribe(val => {
      expect(val).toEqual(allCatsResultMock);
      done();
    });
  });

  it('findAll: should return 500 on db model error', (done) => {
    jest.spyOn(catModel, 'find').mockImplementationOnce(() => new ModelExecRejectMock(null) as any);
    const result = service.findAll();
    expectObservableThrowErr(result, InternalServerErrorException, done);
  });

  it(`update: should call update fn once`, () => {
    catModel.findOneAndUpdate = jest.fn();
    try {
      service.update(testMongoId, updateCatDtoMock);
    } catch (err) {
    }
    expect(catModel.findOneAndUpdate).toBeCalledTimes(1);
    expect(catModel.findOneAndUpdate).toBeCalledWith({ _id: testMongoId }, updateCatDtoMock, undefined, undefined);
  });

  it(`update: should return EMPTY observable`, (done) => {
    jest.spyOn(catModel, 'findOneAndUpdate').mockImplementationOnce(
      (id) => new ModelExecResolveMock({ ...updateCatDtoMock, _id: id._id }) as any
    );
    const result = service.update(testMongoId, updateCatDtoMock);
    expectObservableIsEMPTY(result, done);
  });

  it(`update: should return 404 if not find id`, (done) => {
    jest.spyOn(catModel, 'findOneAndUpdate').mockImplementationOnce(() => new ModelExecResolveMock(null) as any);
    const result = service.update(testMongoId, updateCatDtoMock);
    expectObservableThrowErr(result, NotFoundException, done);
  });

  it(`update: should return 500 on db model error`, (done) => {
    jest.spyOn(catModel, 'findOneAndUpdate').mockImplementationOnce(() => new ModelExecRejectMock(null) as any);
    const result = service.update(testMongoId, updateCatDtoMock);
    expectObservableThrowErr(result, InternalServerErrorException, done);
  });

  it(`delete: should call delete fn once`, () => {
    catModel.findOneAndRemove = jest.fn();
    try {
      service.delete(testMongoId);
    } catch (err) {
    }
    expect(catModel.findOneAndRemove).toBeCalledTimes(1);
    expect(catModel.findOneAndRemove).toBeCalledWith({ _id: testMongoId }, undefined, undefined);
  });

  it(`delete: should return EMPTY observable`, (done) => {
    jest.spyOn(catModel, 'findOneAndRemove').mockImplementationOnce(
      (id) => new ModelExecResolveMock({ ...updateCatDtoMock, _id: id._id }) as any
    );
    const result = service.delete(testMongoId);
    expectObservableIsEMPTY(result, done);
  });

  it(`delete: should return 404 if not find id`, (done) => {
    jest.spyOn(catModel, 'findOneAndRemove').mockImplementationOnce(() => new ModelExecResolveMock(null) as any);
    const result = service.delete(testMongoId);
    expectObservableThrowErr(result, NotFoundException, done);
  });

  it(`delete: should return 500 on db model error`, (done) => {
    jest.spyOn(catModel, 'findOneAndRemove').mockImplementationOnce(() => new ModelExecRejectMock(null) as any);
    const result = service.delete(testMongoId);
    expectObservableThrowErr(result, InternalServerErrorException, done);
  });
});
