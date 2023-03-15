import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, SortDirection, SortType } from '../../constants';
import { AppProcess } from '../../types/state';

const initialState: AppProcess = {
  currentPage: 1,
  currentSortType: SortType.Default,
  currentSortDirection: SortDirection.Ascending
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
      state.currentSortType = SortType.Default;
      state.currentSortDirection = SortDirection.Ascending;
    },
    setCurrentSortType: (state, action: PayloadAction<SortType>) => {
      state.currentSortType = action.payload;
    },
    setCurrentSortDirection: (state, action: PayloadAction<SortDirection>) => {
      state.currentSortDirection = action.payload;
    },
  }
});

export const { setCurrentPage, resetPage, setCurrentSortType, setCurrentSortDirection } = appProcess.actions;

