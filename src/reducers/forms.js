import { SAVE_FORM } from '../constants/actions';

const forms = (state = {}, action) => {
  switch(action.type) {
    case SAVE_FORM: return {
      ...state,
      [action.form.id]: action.form
    };

    default: return state;
  }
}

export default forms;