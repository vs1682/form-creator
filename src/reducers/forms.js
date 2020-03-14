import { SAVE_FORM, UPDATE_CURRENT_FORM } from '../constants/actions';

const forms = (state = {}, action) => {
  switch(action.type) {
    case SAVE_FORM: return {
      ...state,
      currentFormId: action.form.id,
      [action.form.id]: action.form
    };

    case UPDATE_CURRENT_FORM: return {
      ...state,
      currentFormId: action.currentId
    };

    default: return state;
  }
}

export default forms;