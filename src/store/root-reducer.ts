import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../constants';
import { appProcess } from './app-process/app-process-slice';

export const rootReducer = combineReducers({
  [NameSpace.App]: appProcess.reducer,
});
