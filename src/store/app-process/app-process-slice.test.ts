import { SortDirection, SortType } from '../../constants';
import { appProcess, setCurrentPage, resetPage } from './app-process-slice';

describe('Reducer: appProcess', () => {
  test('without additional parameters should return initial state', () => {
    expect(appProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({currentPage: 1});
  });

  test('should set current page to a given value', () => {
    const state = {currentPage: 1, currentSortType: SortType.Default, currentSortDirection: SortDirection.Ascending};
    expect(appProcess.reducer(state, setCurrentPage(5)))
      .toEqual({currentPage: 5});
  });

  test('should reset current page', () => {
    const state = {currentPage: 10, currentSortType: SortType.Default, currentSortDirection: SortDirection.Ascending};
    expect(appProcess.reducer(state, resetPage()))
      .toEqual({currentPage: 1});
  });
});
