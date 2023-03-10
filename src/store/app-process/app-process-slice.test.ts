import { appProcess, setCurrentPage, resetPage } from './app-process-slice';

describe('Reducer: appProcess', () => {
  test('without additional parameters should return initial state', () => {
    expect(appProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({currentPage: 1});
  });

  test('should set current page to a given value', () => {
    const state = {currentPage: 1};
    expect(appProcess.reducer(state, setCurrentPage(5)))
      .toEqual({currentPage: 5});
  });

  test('should reset current page', () => {
    const state = {currentPage: 10};
    expect(appProcess.reducer(state, resetPage()))
      .toEqual({currentPage: 1});
  });
});
