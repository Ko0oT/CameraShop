import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../constants';
import { appProcess } from './app-process/app-process-slice';
import { appData } from './app-data/app-data-slice';

export const rootReducer = combineReducers({
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.Data]: appData.reducer,
});
