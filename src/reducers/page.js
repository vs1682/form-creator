import { CHANGE_PAGE } from '../constants/actions';

const page = (state = 'create', action) => {
  switch(action.type) {
    case CHANGE_PAGE: return action.page;
    default: return state;
  }
}

export default page;