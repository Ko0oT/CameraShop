import { store } from '../store';
import { Product, Promo } from './types';

export type AppProcess = {
  currentPage: number;
  isNeedToUpdate: boolean;
};

export type AppData = {
  cameras: Product[];
  isCamerasDataLoading: boolean;
  promo: Promo;
  isPromoDataLoading: boolean;
  camerasInBasket: number[];
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
