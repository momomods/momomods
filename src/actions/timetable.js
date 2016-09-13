import localforage from 'localforage';

import {
  ADD_MODULE,
  FETCH_TIMETABLE,
  LOAD_TIMETABLE,
  SAVE_TIMETABLE,
} from '../constants';

const dummyData = {
  ClassNo: 'J3',
  LessonType: 'Sectional Teaching',
  WeekText: 'Every Week',
  DayText: 'Tuesday',
  StartTime: '0900',
  EndTime: '1200',
  Venue: 'BIZ2-0413A',
  ModuleCode: 'ACC1006',
  ModuleTitle: 'Accounting Information Systems',
};

/**
 * Fetch a user's timetable for specified year and semester
 * Requires auth.
 *
 * @param {string} year, in the format of "YYYY-YYYY"
 * @param {string} semester, "1", "2", etc.
 */
export function fetchTimetable({ year, semester }) {
  return {
    type: FETCH_TIMETABLE,
    meta: {
      year,
      semester,
    },
    payload: {
      promise: Promise.resolve({ year, semester, data: [dummyData] }),
    },
  };
}

/**
 * Add a module to a particular year & semester's timetable
 *
 * @param {string} year, in the format of "YYYY-YYYY"
 * @param {string} semester, "1", "2", etc.
 * @param {Object} module, module model
 */
export function addModule({ year, semester, module }) {
  return {
    type: ADD_MODULE,
    payload: {
      year,
      semester,
      module,
    },
  };
}

export function loadTimetable({ year, semester }) {
  return {
    type: LOAD_TIMETABLE,
    payload: {
      promise: localforage.getItem(`timetable/${year}/${semester}`).then(JSON.parse),
    },
  };
}

export function saveTimetable({ year, semester, data }) {
  return {
    type: SAVE_TIMETABLE,
    payload: {
      promise: localforage.setItem(
        `timetable/${year}/${semester}`,
        JSON.stringify({ year, semester, data })),
    },
  };
}

export function dummy() {}
