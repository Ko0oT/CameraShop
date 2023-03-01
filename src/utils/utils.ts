export const getPageNumbers = (pagesCount: number): number[] => {
  const numbers = [];
  for (let i = 1; i <= pagesCount; i++) {
    numbers.push(i);
  }
  return numbers;
};
