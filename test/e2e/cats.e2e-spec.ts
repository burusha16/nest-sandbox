import { HttpStatus, INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import * as testRequest from 'supertest';
import { ConfigService } from '../../src/config/config.service';
import { mongooseConfigProvider } from '../../src/core/database/database.providers';
import { CatsModule } from '../../src/pages/cats/cats.module';
import { createCatDtoMock, updateCatDtoMock } from '../mocks/cats/contants';

process.env.NODE_ENV = 'test';

describe('E2E - CatsController', () => {
  let app!: INestApplication;
  let id!: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CatsModule,
        MongooseModule.forRootAsync(mongooseConfigProvider),
      ],
    })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('Loop: create, get one, get all, update, delete, get one, get all', () => {
    beforeAll(async () => {
      const configService = new ConfigService(`./environment/test.env`);
      await mongoose.connect(configService.dbUri, { useNewUrlParser: true });
      await mongoose.connection.dropCollection('cats');
    });

    it(`should return status 201 and id: 1 on add new cat`, (done) =>
      testRequest(app.getHttpServer())
        .post('/cats')
        .send(createCatDtoMock)
        .expect(HttpStatus.CREATED)
        .then(res => {
          const idLength = 24;
          expect(res.text.length).toEqual(idLength);
          id = res.text;
          done();
        }),
    );

    it(`should return status 200, created cat info`, () =>
      testRequest(app.getHttpServer())
        .get('/cats/' + id)
        .expect(HttpStatus.OK, { ...createCatDtoMock, _id: id })
    );

    it(`should return status 200 and cats list`, () =>
      testRequest(app.getHttpServer())
        .get('/cats')
        .expect(HttpStatus.OK, [{ ...createCatDtoMock, _id: id }]),
    );

    it(`should return status 200 on updating cat`, () =>
      testRequest(app.getHttpServer())
        .put('/cats/' + id)
        .send(updateCatDtoMock)
        .expect(HttpStatus.OK, {}),
    );

    it(`should return status 200 and updated cat data`, () =>
      testRequest(app.getHttpServer())
        .get('/cats/' + id)
        .expect(HttpStatus.OK, { ...createCatDtoMock, ...updateCatDtoMock, _id: id }),
    );

    it(`should return status 200 on delete cat`, () =>
      testRequest(app.getHttpServer())
        .delete('/cats/' + id)
        .expect(HttpStatus.OK),
    );

    it(`should return status 404 for deleted cat`, () =>
      testRequest(app.getHttpServer())
        .get('/cats/' + id)
        .expect(HttpStatus.NOT_FOUND),
    );

    it(`should return status 200, empty cats list`, () =>
      testRequest(app.getHttpServer())
        .get('/cats')
        .expect(HttpStatus.OK, []),
    );
  });

  describe('Cat not exist in store or invalid id', () => {
    it(`should return status 404 on get cat which not exist`, () =>
      testRequest(app.getHttpServer())
        .get('/cats/11111111af4818325f87838d')
        .expect(HttpStatus.NOT_FOUND),
    );

    it(`should return status 400 on get with invalid id`, () =>
      testRequest(app.getHttpServer())
        .get('/cats/-1')
        .expect(HttpStatus.BAD_REQUEST)
    );

    it('should return status 404 on delete cat which not exist', () =>
      testRequest(app.getHttpServer())
        .delete('/cats/11111111af4818325f87838d')
        .expect(HttpStatus.NOT_FOUND)
    );

    it('should return status 400 on delete with invalid id', () =>
      testRequest(app.getHttpServer())
        .delete('/cats/-1')
        .expect(HttpStatus.BAD_REQUEST)
    );

    it(`should return status 404 update cat which not exist`, () =>
      testRequest(app.getHttpServer())
        .put('/cats/11111111af4818325f87838d')
        .send(updateCatDtoMock)
        .expect(HttpStatus.NOT_FOUND)
    );

    it(`should return status 400 on update with invalid id`, () =>
      testRequest(app.getHttpServer())
        .put('/cats/-1')
        .send(updateCatDtoMock)
        .expect(HttpStatus.BAD_REQUEST),
    );
  });

  describe('Invalid data on create cat', () => {
    it('should return 400 on create request with empty body', () =>
      testRequest(app.getHttpServer())
        .post('/cats')
        .expect(HttpStatus.BAD_REQUEST),
    );

    it('should return 400 on create request with undifined name', () =>
      testRequest(app.getHttpServer())
        .post('/cats')
        .send({ ...createCatDtoMock, name: undefined })
        .expect(HttpStatus.BAD_REQUEST),
    );

    it('should return 400 on create request with undifined age', () =>
      testRequest(app.getHttpServer())
        .post('/cats')
        .send({ ...createCatDtoMock, age: undefined })
        .expect(HttpStatus.BAD_REQUEST),
    );

    it('should return 400 on create request with undifined breed', () =>
      testRequest(app.getHttpServer())
        .post('/cats')
        .send({ ...createCatDtoMock, breed: undefined })
        .expect(HttpStatus.BAD_REQUEST),
    );

    it('should return 400 on create request with empty breed', () =>
      testRequest(app.getHttpServer())
        .post('/cats')
        .send({ ...createCatDtoMock, breed: '' })
        .expect(HttpStatus.BAD_REQUEST),
    );

    it('should return 400 on create request with empty name', () =>
      testRequest(app.getHttpServer())
        .post('/cats')
        .send({ ...createCatDtoMock, name: '' })
        .expect(HttpStatus.BAD_REQUEST),
    );

    it('should return 400 on create request with name number type', () =>
      testRequest(app.getHttpServer())
        .post('/cats')
        .send({ ...createCatDtoMock, name: 1 })
        .expect(HttpStatus.BAD_REQUEST),
    );

    it('should return 400 on create request with age string type', () =>
      testRequest(app.getHttpServer())
        .post('/cats')
        .send({ ...createCatDtoMock, age: '0' })
        .expect(HttpStatus.BAD_REQUEST),
    );

    it('should return 400 on create request with negative age', () =>
      testRequest(app.getHttpServer())
        .post('/cats')
        .send({ ...createCatDtoMock, age: -1 })
        .expect(HttpStatus.BAD_REQUEST),
    );

    it('should return 400 on create request with breed number type', () =>
      testRequest(app.getHttpServer())
        .post('/cats/')
        .send({ ...createCatDtoMock, breed: 1 })
        .expect(HttpStatus.BAD_REQUEST),
    );
  });

  describe('Invalid or partial data on update cat', () => {
    it('should create new cat instance', () =>
      testRequest(app.getHttpServer())
        .post('/cats')
        .send(createCatDtoMock)
        .then(res => id = res.text)
    );

    it('should return 400 on update request with empty body', () =>
      testRequest(app.getHttpServer())
        .put('/cats/' + id)
        .expect(HttpStatus.BAD_REQUEST),
    );

    it('should return 200 on update request with undifined name', () =>
      testRequest(app.getHttpServer())
        .put('/cats/' + id)
        .send({ ...updateCatDtoMock, name: undefined })
        .expect(HttpStatus.OK),
    );

    it('should return 200 on update request with undifined age', () =>
      testRequest(app.getHttpServer())
        .put('/cats/' + id)
        .send({ ...updateCatDtoMock, age: undefined })
        .expect(HttpStatus.OK),
    );

    it('should return 200 on update request with undifined breed', () =>
      testRequest(app.getHttpServer())
        .put('/cats/' + id)
        .send({ ...updateCatDtoMock, breed: undefined })
        .expect(HttpStatus.OK),
    );

    it('should return 400 on update request with name number type', () =>
      testRequest(app.getHttpServer())
        .put('/cats/' + id)
        .send({ ...updateCatDtoMock, name: 1 })
        .expect(HttpStatus.BAD_REQUEST),
    );

    it('should return 400 on update request with age string type', () =>
      testRequest(app.getHttpServer())
        .put('/cats/' + id)
        .send({ ...updateCatDtoMock, age: '0' })
        .expect(HttpStatus.BAD_REQUEST),
    );

    it('should return 400 on update request with breed number type', () =>
      testRequest(app.getHttpServer())
        .put('/cats/' + id)
        .send({ ...updateCatDtoMock, breed: 1 })
        .expect(HttpStatus.BAD_REQUEST),
    );
  });
});
