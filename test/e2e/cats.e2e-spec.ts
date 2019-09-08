import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as testRequest from 'supertest';
import { CatsModule } from '../../src/pages/cats/cats.module';
import { createCatDtoMock, updateCatDtoMock } from '../mocks/cats/contants';

describe('E2E - CatsController', () => {
  let app!: INestApplication;
  let store = [];

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CatsModule],
    })
      .overrideProvider('CATS_STORE')
      .useValue(store)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('Loop: create, get one, get all, update, delete', () => {
    it(`should return status 201 and id: 1 on add new cat`, () =>
      testRequest(app.getHttpServer())
        .post('/cats')
        .send(createCatDtoMock)
        .expect(HttpStatus.CREATED, '0'),
    );

    it(`should return status 200 cat with id 0`, () =>
      testRequest(app.getHttpServer())
        .get('/cats/0')
        .expect(HttpStatus.OK, { ...createCatDtoMock, id: 0 }),
    );

    it(`should return status 200 and cats list`, () =>
      testRequest(app.getHttpServer())
        .get('/cats')
        .expect(HttpStatus.OK, [{ ...createCatDtoMock, id: 0 }]),
    );

    it(`should return status 200 and cat with id 0`, () =>
      testRequest(app.getHttpServer())
        .put('/cats/0')
        .send(updateCatDtoMock)
        .expect(HttpStatus.OK, {})
        .then(() => {
          expect(store[0]).toEqual({ ...createCatDtoMock, ...updateCatDtoMock, id: 0 });
        }),
    );

    it(`should return status 200 and delete cat with id 0`, () =>
      testRequest(app.getHttpServer())
        .delete('/cats/0')
        .expect(HttpStatus.OK, {})
        .then(() => expect(store[0]).toEqual(undefined)),
    );
  });

  describe('Cat not exist in store', () => {
    it(`should return status 404 update cat which not exist`, () =>
      testRequest(app.getHttpServer())
        .get('/cats/-1')
        .expect(HttpStatus.NOT_FOUND),
    );

    it('should return status 404 on delete cat which not exist', () => {
      testRequest(app.getHttpServer())
        .delete('/cats/-1')
        .expect(HttpStatus.NOT_FOUND);
    });

    it(`should return status 404 update cat which not exist`, () =>
      testRequest(app.getHttpServer())
        .put('/cats/-1')
        .send(updateCatDtoMock)
        .expect(HttpStatus.NOT_FOUND),
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
    beforeAll(() => {
      store = [createCatDtoMock];
    });

    it('should return 400 on update request with empty body', () =>
      testRequest(app.getHttpServer())
        .put('/cats/0')
        .expect(HttpStatus.BAD_REQUEST),
    );

    it('should return 200 on update request with undifined name', () =>
      testRequest(app.getHttpServer())
        .put('/cats/0')
        .send({ ...updateCatDtoMock, name: undefined })
        .expect(HttpStatus.OK),
    );

    it('should return 200 on update request with undifined age', () =>
      testRequest(app.getHttpServer())
        .put('/cats/0')
        .send({ ...updateCatDtoMock, age: undefined })
        .expect(HttpStatus.OK),
    );

    it('should return 200 on update request with undifined breed', () =>
      testRequest(app.getHttpServer())
        .put('/cats/0')
        .send({ ...updateCatDtoMock, breed: undefined })
        .expect(HttpStatus.OK),
    );

    it('should return 400 on update request with name number type', () =>
      testRequest(app.getHttpServer())
        .put('/cats/0')
        .send({ ...updateCatDtoMock, name: 1 })
        .expect(HttpStatus.BAD_REQUEST),
    );

    it('should return 400 on update request with age string type', () =>
      testRequest(app.getHttpServer())
        .put('/cats/0')
        .send({ ...updateCatDtoMock, age: '0' })
        .expect(HttpStatus.BAD_REQUEST),
    );

    it('should return 400 on update request with breed number type', () =>
      testRequest(app.getHttpServer())
        .put('/cats/0')
        .send({ ...updateCatDtoMock, breed: 1 })
        .expect(HttpStatus.BAD_REQUEST),
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
