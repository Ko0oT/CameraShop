import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { Action } from 'redux';
import { makeFakeCameras, makeFakePromo } from '../utils/mocks';
import { APIRoute } from '../constants';
import { fetchCamerasAction, fetchPromoAction } from './api-action';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  test('should dispatch Load_Cameras when GET /cameras', async () => {
    const mockCameras = makeFakeCameras();
    mockAPI
      .onGet(APIRoute.Cameras)
      .reply(200, mockCameras);

    const store = mockStore();

    await store.dispatch(fetchCamerasAction());

    const actions = store.getActions().map(({type}) => type as Action);

    expect(actions).toEqual([
      fetchCamerasAction.pending.type,
      fetchCamerasAction.fulfilled.type
    ]);
  });

  test('should dispatch Load_Promo when GET /promo', async () => {
    const mockPromo = makeFakePromo();
    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200, mockPromo);

    const store = mockStore();

    await store.dispatch(fetchPromoAction());

    const actions = store.getActions().map(({type}) => type as Action);

    expect(actions).toEqual([
      fetchPromoAction.pending.type,
      fetchPromoAction.fulfilled.type
    ]);
  });
});
