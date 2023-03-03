import { getPageNumbers } from './utils';

describe('function getPageNumbers', () => {
  test('should return empty array when argument equal 0', () => {
    const arr = getPageNumbers(0);
    expect(arr.length).toBe(0);
    expect(arr).toBeInstanceOf(Array);
  });

  test('should return empty array when argument equal NaN', () => {
    const arr = getPageNumbers(NaN);
    expect(arr.length).toBe(0);
    expect(arr).toBeInstanceOf(Array);
  });

  test('should return array with 5 digits from 1 till 5', () => {
    const arr = getPageNumbers(5);
    expect(arr.length).toBe(5);
    expect(arr).toBeInstanceOf(Array);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });

});
