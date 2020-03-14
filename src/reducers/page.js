import { CHANGE_PAGE } from '../constants/actions';

const page = (state = {}, action) => {
  switch(action.type) {
    case CHANGE_PAGE: return {
      ...state,
      page: action.page
    };

    default: return state;
  }
}

export default page;