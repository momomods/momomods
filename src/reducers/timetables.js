import _ from 'lodash';

import { ADD_MODULE, REMOVE_MODULE } from '../actions/timetables';
import { randomLessonConfiguration } from '../utils/modules';

// Ref: https://github.com/yangshun/nusmods-v3/tree/master/src/js

const defaultTimetableState = {}; // Map of semester to semesterTimetable.
const defaultSemesterTimetableState = {}; // Map of ModuleCode to timetable config for module.

function semesterTimetable(state = defaultSemesterTimetableState, action, entities) {
  const moduleCode = action.payload.moduleCode;
  const semester = action.payload.semester;
  switch (action.type) {
    default:
      return state;
  }
}

function timetables(state = defaultTimetableState, action, entities) {
  switch (action.type) {
    case ADD_MODULE:
    default:
      return state;
  }
}

export default timetables;
