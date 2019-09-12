import { CreateCatDto } from '../../../src/pages/cats/shared/dto/create-cat.dto';
import { UpdateCatDto } from '../../../src/pages/cats/shared/dto/update-cat.dto';

export const createCatDtoMock: CreateCatDto = {
  name: 'ilnur',
  age: 26,
  breed: 'tatarin',
};

export const updateCatDtoMock: UpdateCatDto = {
  name: 'timoshka',
  age: 1,
  breed: 'russian'
};

export const oneCatResultMock: UpdateCatDto = {
  name: 'tom',
  age: 3,
  breed: 'british',
};

export const testMongoId = '0123456789abcdef01234567';

export const allCatsResultMock = new Array(10)
  .fill(null)
  .map((v, i) => ({ ...oneCatResultMock, _id: testMongoId }));
