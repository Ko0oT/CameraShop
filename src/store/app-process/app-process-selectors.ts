import { NameSpace } from '../../constants';
import { State } from '../../types/state';

export const getCurrentPage = (state: State): number => state[NameSpace.App].currentPage;
