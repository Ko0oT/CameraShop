import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product, Promo } from '../types/types';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../constants';

export const fetchCamerasAction = createAsyncThunk<Product[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameras',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Product[]>(APIRoute.Cameras);
    return data;
  }
);

export const fetchPromoAction = createAsyncThunk<Promo, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromo',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Promo>(APIRoute.Promo);
    return data;
  }
);
