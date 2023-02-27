import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants';
import { AppData } from '../../types/state';
import { Promo } from '../../types/types';
import { fetchCamerasAction, fetchPromoAction } from '../api-action';

const initialState: AppData = {
  cameras: [],
  isCamerasDataLoading: false,
  promo: {} as Promo,
  isPromoDataLoading: false,
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isCamerasDataLoading = true;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.isCamerasDataLoading = false;
      })
      .addCase(fetchPromoAction.pending, (state) => {
        state.isPromoDataLoading = true;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.isPromoDataLoading = false;
      });
  }
});

