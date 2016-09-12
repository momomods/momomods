// import { combineReducers } from 'redux';
import group from './group';
import module from './module';
import moduledetail from './moduledetail';
import modulelist from './modulelist';
import runtime from './runtime';
import timetable from './timetable';
import user from './user';

import requests from './requests';
import entities from './entities/index';
import selection from './selection';
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
    moduledetail: moduledetail(state.moduledetail, action),
    modulelist: modulelist(state.modulelist, action),
    runtime: runtime(state.runtime, action),
    timetable: timetable(state.timetable, action),
    user: user(state.user, action),
    entities: entities(state.entities, action),
    requests: requests(state.requests, action),
    selection: selection(state.selection, action),
    timetables: timetables(state.timetables, action, state.entities),
    // routing: routerReducer(state.routing, action),
  };
}
