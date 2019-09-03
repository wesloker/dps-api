/* eslint-disable no-undef */
const { fetchIGPAPI } = require('../helpers/earthquake.helpers');

describe('FetchIGPAPI Unit Test', () => {
  let arr;
  /* Function executions should return respective throw exceptions' */
  arr = [null, undefined, () => {}, {}, []];
  const types = ['null', 'undefined', 'function', 'object', 'boolean', 'array'];
  arr.forEach((id, index) => {
    test(`Should return an exception for ${types[index]} types`, async () => {
      await expect(fetchIGPAPI(id)).rejects.toThrow(
        `Unexpected value. ID must be a string or number but got: ${id}`,
      );
    });
  });
  test('Should return an exception for values less than or equal to zero', () => {
    const values = [0, -1];
    values.forEach(async (id) => {
      await expect(fetchIGPAPI(id)).rejects.toThrow(
        `Unexpected value. ID must be a number greater than 0 but got: ${id}`,
      );
    });
  });
  test(`Should return an exception for values other than 'last' or 'all'`, async () => {
    const id = 'lastt';
    await expect(fetchIGPAPI(id)).rejects.toThrow(
      `Unexpected value. ID value must be 'last' or 'all' but got: ${id}`,
    );
  });
  /* Function executions should return object type */
  arr = ['last', 'all'];
  arr.forEach((id) => {
    test(`Should return an object for '${id}' id`, async () => {
      const data = await fetchIGPAPI(id);
      expect(typeof data).toBe('object');
    });
  });
});
