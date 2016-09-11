// import { combineReducers } from 'redux';
import group from './group';
import module from './module';
import runtime from './runtime';
import timetable from './timetable';
import user from './user';

import requests from './requests';
import entities from './entities/index';
import timetables from './timetables';

// export default combineReducers({
//   group,
//   module,
//   runtime,
//   timetable,
//   user,
//   entities,
//   requests,
//   timetables
// });

export default function (state = {}, action) {
  return {
    group: group(state.group, action),
    module: module(state.module, action),
    runtime: runtime(state.runtime, action),
    timetable: timetable(state.timetable, action),
    user: user(state.user, action),
    entities: entities(state.entities, action),
    requests: requests(state.requests, action),
    timetables: timetables(state.timetables, action, state.entities),
    // routing: routerReducer(state.routing, action),
  };
}
