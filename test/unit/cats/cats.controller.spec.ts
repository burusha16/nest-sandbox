import { Test, TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';
import { CatsController } from '../../../src/pages/cats/cats.controller';
import { CatsService } from '../../../src/pages/cats/cats.service';
import { CreateCatDto } from '../../../src/pages/cats/shared/dto/create-cat.dto';
import { ICat } from '../../../src/pages/cats/shared/interfaces/cat.interface';
import { CatsMockService} from '../../mocks/cats/cats.service';
import { allCatsResultMock, oneCatResultMock } from '../../mocks/cats/contants';

describe('Cats Controller', () => {
  let controller: CatsController;
  let catsService: CatsService;
  const createData: CreateCatDto = {
    name: 'ilnur',
    age: 26,
    breed: 'tatarin',
  };
  const createId = 1;
  const findOndeId = '0';

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
    controller.create(createData);
    expect(catsService.add).toBeCalledWith(createData);
    expect(catsService.add).toBeCalledTimes(1);
  });

  it(`should return observable with id: ${createId} on add new cat`, () => {
    const result: Observable<number> = controller.create(createData);
    expect(result).toBeInstanceOf(Observable);
    result.subscribe(val => expect(val).toEqual(createId));
  });

  it('should call catService findOne method', () => {
    catsService.findOne = jest.fn();
    controller.findOne(findOndeId);
    expect(catsService.findOne).toBeCalledWith(findOndeId);
    expect(catsService.findOne).toBeCalledTimes(1);
  });

  it(`should return observable with cat data`, () => {
    const result: Observable<ICat> = controller.findOne(findOndeId);
    expect(result).toBeInstanceOf(Observable);
    result.subscribe(val => expect(val).toEqual(oneCatResultMock));
  });

  it('should call catService findAll method', () => {
    catsService.findAll = jest.fn();
    controller.findAll();
    expect(catsService.findAll).toBeCalled();
    expect(catsService.findAll).toBeCalledTimes(1);
  });

  it(`should return observable with all cats data`, () => {
    const result: Observable<ICat[]> = controller.findAll();
    expect(result).toBeInstanceOf(Observable);
    result.subscribe(val => expect(val).toEqual(allCatsResultMock));
  });

  it('should call catService update method', () => {
    catsService.update = jest.fn();
    controller.update(findOndeId, createData);
    expect(catsService.update).toBeCalledWith(findOndeId, createData);
    expect(catsService.update).toBeCalledTimes(1);
  });

  it('should call catService delete method', () => {
    catsService.delete = jest.fn();
    controller.remove(findOndeId);
    expect(catsService.delete).toBeCalledWith(findOndeId);
    expect(catsService.delete).toBeCalledTimes(1);
  });
});
