export const createCatDtoMock = {
  name: 'ilnur',
  age: 26,
  breed: 'tatarin',
};

export const updateCatDtoMock = {
  name: 'timoshka',
  age: 1,
};

export const oneCatResultMock = {
  name: 'tom',
  age: 3,
  breed: 'british',
  id: 0,
};

export const allCatsResultMock = new Array(10)
  .fill(null)
  .map((v, i) => ({ ...oneCatResultMock, id: i }));
