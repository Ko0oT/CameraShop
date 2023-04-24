import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants';
import { AppData } from '../../types/state';
import { Promo } from '../../types/types';
import { fetchCamerasAction, fetchPromoAction } from '../api-action';

const initialState: AppData = {
  cameras: [],
  isCamerasDataLoading: false,
  promo: {} as Promo,
  isPromoDataLoading: false,
  camerasInBasket: [],
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    addCameraInBasket: (state, action: PayloadAction<number>) => {
      state.camerasInBasket.push(action.payload);
    },
    deleteCameraFromBasket: (state, action: PayloadAction<number>) => {
      state.camerasInBasket = state.camerasInBasket.filter((it) => it !== action.payload);
    },
    changeQuantityInBasket: (state, action: PayloadAction<{value: number; id: number}>) => {
      const otherIds = state.camerasInBasket.filter((it) => it !== action.payload.id);
      const newArray = new Array(action.payload.value).fill(action.payload.id) as number[];
      state.camerasInBasket = [...otherIds, ...newArray];
    },
    clearBasket: (state) => {
      state.camerasInBasket = [];
    }
  },
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

export const {addCameraInBasket, deleteCameraFromBasket, changeQuantityInBasket, clearBasket} = appData.actions;
