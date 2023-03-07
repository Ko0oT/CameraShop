import { MAIN_CONTENT_POSITION } from "../constants";

export const getPageNumbers = (pagesCount: number): number[] => {
  const numbers = [];
  for (let i = 1; i <= pagesCount; i++) {
    numbers.push(i);
  }
  return numbers;
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};

export const scrollToContent = () => {
  window.scrollTo({
    top: MAIN_CONTENT_POSITION,
    left: 0,
    behavior: 'smooth',
  });
};
