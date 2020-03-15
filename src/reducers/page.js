import { CHANGE_PAGE } from '../constants/actions';

const page = (state = 'list', action) => {
  switch(action.type) {
    case CHANGE_PAGE: return action.page;
    default: return state;
  }
}

export default page;