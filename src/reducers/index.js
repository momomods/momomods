import { combineReducers } from 'redux';
import runtime from './runtime';
import user from './user';
import timetable from './timetable';

export default combineReducers({
  runtime,
  user,
  timetable,
});
