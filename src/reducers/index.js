import group from './group';
import module from './module';
import runtime from './runtime';
import searchIndex from './searchIndex';
import timetable from './timetable';
import user from './user';

import requests from './requests';
import entities from './entities/index';
import selection from './selection';
import theme from './theme';
import friend from './friend';
import timeshare from './timeshare';

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
    theme: theme(state.theme, action),
    friend: friend(state.friend, action),
    timeshare: timeshare(state.timeshare, action),
  };
}
