import { combineReducers } from 'redux';

import page from './page';
import forms from './forms';

const reducers = combineReducers({
  page,
  forms
});

export default reducers;