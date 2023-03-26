import { MAIN_CONTENT_POSITION, SortDirection, SortType } from '../constants';
import { Filter, Price, Product } from '../types/types';

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
    case SortDirection.Default:
      sortedCamerasBySortDirection = defaultCameras;
      break;
    case SortDirection.Ascending:
      sortedCamerasBySortDirection = sortedCamerasBySortType;
      break;
    case SortDirection.Descending:
      sortedCamerasBySortDirection = sortedCamerasBySortType.reverse();
      break;
  }

  return sortedCamerasBySortDirection;
};

export const filterCamerasByOtherOptions = (array: Product[], filters: Filter) => {

  const keys = Object.keys(filters).filter((key) => Object.prototype.hasOwnProperty.call(filters, key)).filter((it) => filters[it as keyof Filter].length > 0);

  return array.filter((elem) => {
    const commonKeys = keys.filter((key) => Object.prototype.hasOwnProperty.call(elem, key));

    return commonKeys.reduce((flag, key) => (flag && filters[key as keyof Filter].includes(elem[key as never])), true);
  });
};

export const filterCamerasByPrice = (array: Product[], price: Price) => {
  let result = array;
  if(price.minPrice !== '') {
    result = result.filter((it) => it.price >= price.minPrice);
  }
  if(price.maxPrice !== '') {
    result = result.filter((it) => it.price <= price.maxPrice);
  }
  return result;
};

export const findMinAndMaxPrice = (array: Product[]) => {
  if (array.length === 0 || !array) {
    return [undefined, undefined];
  }
  const defaultCameras = [...array];
  const sortedCamerasByPrice = defaultCameras.sort((a, b) => a.price - b.price);
  return [sortedCamerasByPrice[0].price, sortedCamerasByPrice[sortedCamerasByPrice.length - 1].price];
};

