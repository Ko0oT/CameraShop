import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants';

const initialState = {
  currentPage: 1,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    resetPage: (state) => {
      state.currentPage = 1;
    },
  }
});

export const { setCurrentPage, resetPage } = appProcess.actions;

