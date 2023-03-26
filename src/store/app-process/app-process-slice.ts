import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants';
import { AppProcess } from '../../types/state';

const initialState: AppProcess = {
  currentPage: 1,
  isNeedToUpdate: false,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setNeedToUpdate: (state, action: PayloadAction<boolean>) => {
      state.isNeedToUpdate = action.payload;
      state.currentPage = 1;
    }
  }
});

export const { setCurrentPage, setNeedToUpdate } = appProcess.actions;

