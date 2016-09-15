// import { combineReducers } from 'redux';
import group from './group';
import module from './module';
import runtime from './runtime';
import searchIndex from './searchIndex';
import timetable from './timetable';
import user from './user';

import requests from './requests';
import entities from './entities/index';
import selection from './selection';

// export default combineReducers({
//   group,
//   module,
//   runtime,
//   timetable,
//   user,
//   entities,
//   requests,
// });

export default function (state = {}, action) {
  return {
    group: group(state.group, action),
    module: module(state.module, action),
    runtime: runtime(state.runtime, action),
    searchIndex: searchIndex(state.searchIndex, action),
    timetable: timetable(state.timetable, action),
    user: user(state.user, action),
    entities: entities(state.entities, action),
    requests: requests(state.requests, action),
    selection: selection(state.selection, action),
    // routing: routerReducer(state.routing, action),
  };
}
