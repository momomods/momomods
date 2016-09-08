import { combineReducers } from 'redux';
import group from './group';
import module from './module';
import runtime from './runtime';
import timetable from './timetable';
import user from './user';

export default combineReducers({
  group,
  module,
  runtime,
  timetable,
  user,
});
