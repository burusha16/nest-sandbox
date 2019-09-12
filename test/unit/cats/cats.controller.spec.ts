import { Test, TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';
import { CatsController } from '../../../src/pages/cats/cats.controller';
import { CatsService } from '../../../src/pages/cats/cats.service';
import { ICat, ICatDocument } from '../../../src/pages/cats/shared/interfaces/cat.interface';
import { CatsMockService } from '../../mocks/cats/cats.service.mock';
import { allCatsResultMock, createCatDtoMock, oneCatResultMock, testMongoId } from '../../mocks/cats/contants';

describe('Cats Controller', () => {
  let controller: CatsController;
  let catsService: CatsService;
  const findOneId = '98765432109876543210aaaa';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        {
          provide: CatsService,
          useClass: CatsMockService,
        },
      ],
    }).compile();

    controller = module.get<CatsController>(CatsController);
    catsService = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call catService add method once with ctrateData params', () => {
    catsService.add = jest.fn();
    controller.create(createCatDtoMock);
    expect(catsService.add).toBeCalledWith(createCatDtoMock);
    expect(catsService.add).toBeCalledTimes(1);
  });

  it(`should return observable with id: ${testMongoId} on add new cat`, (done) => {
    const result: Observable<string> = controller.create(createCatDtoMock);
    expect(result).toBeInstanceOf(Observable);
    result.subscribe(val => {
      expect(val).toEqual(testMongoId);
      done();
    });
  });

  it('should call catService findOne method', () => {
    catsService.findOne = jest.fn();
    controller.findOne(findOneId);
    expect(catsService.findOne).toBeCalledWith(findOneId);
    expect(catsService.findOne).toBeCalledTimes(1);
  });

  it(`should return observable with cat data`, (done) => {
    const result: Observable<ICat> = controller.findOne(findOneId);
    expect(result).toBeInstanceOf(Observable);
    result.subscribe(val => {
      expect(val).toEqual({ ...oneCatResultMock, _id: findOneId });
      done();
    });
  });

  it('should call catService findAll method', () => {
    catsService.findAll = jest.fn();
    controller.findAll();
    expect(catsService.findAll).toBeCalled();
    expect(catsService.findAll).toBeCalledTimes(1);
  });

  it(`should return observable with all cats data`, (done) => {
    const result: Observable<ICat[]> = controller.findAll();
    expect(result).toBeInstanceOf(Observable);
    result.subscribe(val => {
      expect(val).toEqual(allCatsResultMock);
      done();
    });
  });

  it('should call catService update method', () => {
    catsService.update = jest.fn();
    controller.update(findOneId, createCatDtoMock);
    expect(catsService.update).toBeCalledWith(findOneId, createCatDtoMock);
    expect(catsService.update).toBeCalledTimes(1);
  });

  it('should call catService delete method', () => {
    catsService.delete = jest.fn();
    controller.remove(findOneId);
    expect(catsService.delete).toBeCalledWith(findOneId);
    expect(catsService.delete).toBeCalledTimes(1);
  });
});
