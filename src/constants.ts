export const AppRoute = {
  Root: '/',
  Product: '/product',
  Basket: '/basket',
  NotFound: '/not_found',
  Description: 'description',
  Characteristics: 'characteristics'
} as const;

export const APIRoute = {
  Cameras: '/cameras',
  Similar: 'similar',
  Reviews: '/reviews'
} as const;

export const NameSpace = {
  App: 'APP',
} as const;

export const PRODUCTS_PER_PAGE = 9;

export const PRODUCTS_PER_SLIDER = 3;

export const REVIEWS_COUNT = 3;

export const INTERSECTION_DELAY = 500;
