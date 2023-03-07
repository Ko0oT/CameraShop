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
  Reviews: '/reviews',
  Promo: '/promo',
} as const;

export const NameSpace = {
  App: 'APP',
  Data: 'DATA'
} as const;

export const PRODUCTS_PER_PAGE = 9;

export const PRODUCTS_PER_SLIDER = 3;

export const REVIEWS_COUNT = 3;

export const INTERSECTION_DELAY = 500;

export const USEFORM_MODE = 'all';

export const MAX_STARS_RATING = 5;

export const REVIEW_COMMENT_MIN_LENGTH = 5;

export const MAIN_CONTENT_POSITION = 500;

export const UNAUTHORIZED_STATUS_CODE = 401;
