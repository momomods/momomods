import { combineReducers } from 'redux';
import runtime from './runtime';
import user from './user';

export default combineReducers({
  runtime,
  user,
});
