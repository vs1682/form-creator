import { CHANGE_PAGE } from '../constants/actions';

export const changePage = page => ({
  type: CHANGE_PAGE,
  page
});