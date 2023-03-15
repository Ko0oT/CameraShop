import { SortDirection, SortType } from '../constants';
import { store } from '../store';
import { Product, Promo } from './types';

export type AppProcess = {
  currentPage: number;
  currentSortType: SortType;
  currentSortDirection: SortDirection;
};

export type AppData = {
  cameras: Product[];
  isCamerasDataLoading: boolean;
  promo: Promo;
  isPromoDataLoading: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
