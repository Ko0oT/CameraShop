import { store } from '../store';

export type AppProcess = {
  currentPage: number;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
