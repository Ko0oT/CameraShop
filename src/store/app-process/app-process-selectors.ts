import { NameSpace } from '../../constants';
import { State } from '../../types/state';

export const getCurrentPage = (state: State): number => state[NameSpace.App].currentPage;

export const getIsNeedToUpdate = (state: State): boolean => state[NameSpace.App].isNeedToUpdate;
