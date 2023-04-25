import { AppData } from '../../types/state';
import { makeFakeCameras, makeFakePromo } from '../../utils/mocks';
import { fetchCamerasAction, fetchPromoAction } from '../api-action';
import { addCameraInBasket, appData, changeQuantityInBasket, clearBasket, deleteCameraFromBasket } from './app-data-slice';
import { Product, Promo } from '../../types/types';


const cameras = makeFakeCameras(30);
const promo = makeFakePromo();

describe('Reducer: appData', () => {
  test('without additional parameters should return initial state', () => {
    expect(appData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        cameras: [],
        isCamerasDataLoading: false,
        promo: {},
        isPromoDataLoading: false,
        camerasInBasket: [],
      });
  });

  test('should update cameras by load cameras', () => {
    const state: AppData = {
      cameras: [] as Product[],
      isCamerasDataLoading: false,
      promo: {} as Promo,
      isPromoDataLoading: false,
      camerasInBasket: [],
    };

    expect(appData.reducer(state, {type: fetchCamerasAction.fulfilled.type, payload: cameras}))
      .toEqual({
        cameras,
        isCamerasDataLoading: false,
        promo: {},
        isPromoDataLoading: false,
        camerasInBasket: [],
      });
  });

  test('should update promo by load promo', () => {
    const state: AppData = {
      cameras: [] as Product[],
      isCamerasDataLoading: false,
      promo: {} as Promo,
      isPromoDataLoading: false,
      camerasInBasket: [],
    };

    expect(appData.reducer(state, {type: fetchPromoAction.fulfilled.type, payload: promo}))
      .toEqual({
        cameras: [],
        isCamerasDataLoading: false,
        promo,
        isPromoDataLoading: false,
        camerasInBasket: [],
      });
  });

  test('should add camera in the busket', () => {
    const state: AppData = {
      cameras: [] as Product[],
      isCamerasDataLoading: false,
      promo: {} as Promo,
      isPromoDataLoading: false,
      camerasInBasket: [1, 2, 3, 3],
    };

    expect(appData.reducer(state, addCameraInBasket(1)))
      .toEqual({
        cameras: [] as Product[],
        isCamerasDataLoading: false,
        promo: {} as Promo,
        isPromoDataLoading: false,
        camerasInBasket: [1, 2, 3, 3, 1],
      });
  });

  test('should delete camera from the busket', () => {
    const state: AppData = {
      cameras: [] as Product[],
      isCamerasDataLoading: false,
      promo: {} as Promo,
      isPromoDataLoading: false,
      camerasInBasket: [1, 2, 3, 3],
    };

    expect(appData.reducer(state, deleteCameraFromBasket(3)))
      .toEqual({
        cameras: [] as Product[],
        isCamerasDataLoading: false,
        promo: {} as Promo,
        isPromoDataLoading: false,
        camerasInBasket: [1, 2],
      });
  });

  test('should change quantity of product in the busket', () => {
    const state: AppData = {
      cameras: [] as Product[],
      isCamerasDataLoading: false,
      promo: {} as Promo,
      isPromoDataLoading: false,
      camerasInBasket: [1, 2, 3, 3, 3],
    };

    expect(appData.reducer(state, changeQuantityInBasket({value: 1, id: 3})))
      .toEqual({
        cameras: [] as Product[],
        isCamerasDataLoading: false,
        promo: {} as Promo,
        isPromoDataLoading: false,
        camerasInBasket: [1, 2, 3],
      });
  });

  test('should clear busket', () => {
    const state: AppData = {
      cameras: [] as Product[],
      isCamerasDataLoading: false,
      promo: {} as Promo,
      isPromoDataLoading: false,
      camerasInBasket: [1, 2, 3, 3, 3],
    };

    expect(appData.reducer(state, clearBasket()))
      .toEqual({
        cameras: [] as Product[],
        isCamerasDataLoading: false,
        promo: {} as Promo,
        isPromoDataLoading: false,
        camerasInBasket: [],
      });
  });
});
