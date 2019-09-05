import { Test, TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';
import { CatsService } from '../../../src/pages/cats/cats.service';
import { CreateCatDto } from '../../../src/pages/cats/shared/dto/create-cat.dto';
import { ICat } from '../../../src/pages/cats/shared/interfaces/cat.interface';
import { allCatsResultMock, createCatDtoMock, updateCatDtoMock } from '../../mocks/cats/contants';

describe('CatsService', () => {
  let service: CatsService;
  const store: Array<ICat> = [...allCatsResultMock];
  const createData: CreateCatDto = createCatDtoMock;
  let addedCatIndex!: number;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'CATS_STORE',
          useValue: store,
        },
        CatsService,
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add cat to store', () => {
    const result = service.add(createData);
    expect(result).toBeInstanceOf(Observable);
    result.subscribe(id => {
      addedCatIndex = id;
      expect(store[id]).toEqual({ ...createData, id });
    });
  });

  it('should find one cat from store', () => {
    service.findOne(addedCatIndex.toString())
      .subscribe(cat => expect(cat).toEqual({ ...createData, id: addedCatIndex }));
  });

  it('should find all cats from store', () => {
    service.findAll()
      .subscribe(cats => {
        expect(cats).toEqual([
          ...allCatsResultMock,
          {
            ...createCatDtoMock,
            id: addedCatIndex,
          },
        ]);
      });
  });

  it(`should update cat with id ${addedCatIndex}`, () => {
    const prevCatValue = store[addedCatIndex];
    service.update(addedCatIndex.toString(), updateCatDtoMock);
    expect(store[addedCatIndex]).toEqual({...prevCatValue, ...updateCatDtoMock});
  });

  it(`should delete cat with id ${addedCatIndex}`, () => {
    expect(store[addedCatIndex]).toBeDefined();
    service.delete(addedCatIndex.toString());
    expect(store[addedCatIndex]).toBeUndefined();
  });
});
