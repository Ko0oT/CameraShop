import { NameSpace, SortDirection, SortType } from '../../constants';
import { State } from '../../types/state';

export const getCurrentPage = (state: State): number => state[NameSpace.App].currentPage;

export const getCurrentSortType = (state: State): SortType => state[NameSpace.App].currentSortType;

export const getCurrentSortDirection = (state: State): SortDirection => state[NameSpace.App].currentSortDirection;
