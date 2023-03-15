import { MAIN_CONTENT_POSITION, SortDirection, SortType } from '../constants';
import { Product } from '../types/types';

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

export const sortCameras = (cameras: Product[], sortType: SortType, sortDirection: SortDirection): Product[] => {
  const defaultCameras = [...cameras];
  let sortedCamerasBySortType;

  switch (sortType) {
    case SortType.Default:
      sortedCamerasBySortType = defaultCameras;
      break;
    case SortType.Price:
      sortedCamerasBySortType = defaultCameras.sort((a, b) => a.price - b.price);
      break;
    case SortType.Rating:
      sortedCamerasBySortType = defaultCameras.sort((a, b) => a.rating - b.rating);
      break;
  }

  let sortedCamerasBySortDirection;

  switch (sortDirection) {
    case SortDirection.Ascending:
      sortedCamerasBySortDirection = sortedCamerasBySortType;
      break;
    case SortDirection.Descending:
      sortedCamerasBySortDirection = sortedCamerasBySortType.reverse();
      break;
  }

  return sortedCamerasBySortDirection;
};
