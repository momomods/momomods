import { combineReducers } from 'redux';
import module from './module';
import runtime from './runtime';
import timetable from './timetable';
import user from './user';

export default combineReducers({
  module,
  runtime,
  timetable,
  user,
});
