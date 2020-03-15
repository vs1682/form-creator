import { combineReducers } from 'redux';

import page from './page';
import formData from './forms';

const reducers = combineReducers({
  page,
  formData
});

export default reducers;