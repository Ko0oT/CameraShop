import { AppData } from '../../types/state';
import { makeFakeCameras, makeFakePromo } from '../../utils/mocks';
import { fetchCamerasAction, fetchPromoAction } from '../api-action';
import { appData } from './app-data-slice';
import { Product, Promo } from '../../types/types';


const cameras = makeFakeCameras();
const promo = makeFakePromo();

describe('Reducer: appData', () => {
  test('without additional parameters should return initial state', () => {
    expect(appData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        cameras: [],
        isCamerasDataLoading: false,
        promo: {},
        isPromoDataLoading: false,
      });
  });

  test('should update cameras by load cameras', () => {
    const state: AppData = {
      cameras: [] as Product[],
      isCamerasDataLoading: false,
      promo: {} as Promo,
      isPromoDataLoading: false,
    };

    expect(appData.reducer(state, {type: fetchCamerasAction.fulfilled.type, payload: cameras}))
      .toEqual({
        cameras,
        isCamerasDataLoading: false,
        promo: {},
        isPromoDataLoading: false,
      });
  });

  test('should update promo by load promo', () => {
    const state: AppData = {
      cameras: [] as Product[],
      isCamerasDataLoading: false,
      promo: {} as Promo,
      isPromoDataLoading: false,
    };

    expect(appData.reducer(state, {type: fetchPromoAction.fulfilled.type, payload: promo}))
      .toEqual({
        cameras: [],
        isCamerasDataLoading: false,
        promo,
        isPromoDataLoading: false,
      });
  });

});
