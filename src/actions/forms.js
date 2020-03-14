import { SAVE_FORM } from '../constants/actions';

export const saveForm = form => ({
  type: SAVE_FORM,
  form
});