import { NameSpace } from '../../constants';
import { State } from '../../types/state';
import { Product, Promo } from '../../types/types';

export const getCameras = (state: State): Product[] => state[NameSpace.Data].cameras;

export const getPromo = (state: State): Promo => state[NameSpace.Data].promo;

export const getIsCamerasDataLoading = (state: State): boolean => state[NameSpace.Data].isCamerasDataLoading;

export const getIsPromoDataLoading = (state: State): boolean => state[NameSpace.Data].isPromoDataLoading;
