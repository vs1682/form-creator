import { SAVE_FORM, UPDATE_CURRENT_FORM } from '../constants/actions';

export const saveForm = form => ({
  type: SAVE_FORM,
  form
});

export const updateCurrentFormId = id => ({
  type: UPDATE_CURRENT_FORM,
  currentId: id
});