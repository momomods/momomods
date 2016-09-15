import localforage from 'localforage';

import {
  ADD_MODULE,
  REMOVE_MODULE,
  CHANGE_LESSON,
  CANCEL_CHANGE_LESSON,

  FETCH_TIMETABLE,
  SUBMIT_TIMETABLE,
  LOAD_TIMETABLE,
  SAVE_TIMETABLE,
} from '../constants';
import { request } from './helpers';

/**
 * Fetch a user's timetable for specified year and semester
 * Requires auth.
 *
 * @param {string} year, in the format of "YYYY-YYYY"
 * @param {string} semester, "1", "2", etc.
 */
export function fetchTimetable({ year, semester }) {
  const url = `/api/${year}/${semester}/timetable`;
  return {
    type: FETCH_TIMETABLE,
    meta: {
      year,
      semester,
    },
    payload: {
      promise: request(url),
    },
  };
}

/**
 * Persists a user's timetable for specified year and semester to database.
 * Requires auth.
 *
 * @param {string} year, in the format of "YYYY-YYYY"
 * @param {string} semester, "1", "2", etc.
 * @param {Object} timetable, timetable model, an array of lessons
 */
export function submitTimetable({ year, semester, timetable }) {
  const url = `/api/${year}/${semester}/timetable`;
  return {
    type: SUBMIT_TIMETABLE,
    meta: {
      year,
      semester,
    },
    payload: {
      promise: request(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(timetable),
      }),
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

/**
 * Remove a module from a particular year & semester's timetable
 *
 * @param {string} year, in the format of "YYYY-YYYY"
 * @param {string} semester, "1", "2", etc.
 * @param {string} code, module code
 */
export function removeModule({ year, semester, code }) {
  return {
    type: REMOVE_MODULE,
    payload: {
      year,
      semester,
      code,
    },
  };
}

/**
 * Change a class in a module in a timetable
 *
 * @param {string} year, in the format of "YYYY-YYYY"
 * @param {string} semester, "1", "2", etc.
 * @param {string} code, module code
 * @param {string} lessonType, type of lesson
 * @param {string} classNo, class number
 */
export function changeLesson({ year, semester, activeLesson }) {
  console.log('clicked', {year, semester, activeLesson});
  return {
    type: CHANGE_LESSON,
    payload: {
      year,
      semester,
      activeLesson,
    },
  };
}

/**
 * Cancel interaction to change lesson
 */
export function cancelChangeLesson() {
  console.log('cancelled');
  return {
    type: CANCEL_CHANGE_LESSON,
  };
}

export function loadTimetable({ year, semester }) {
  return {
    type: LOAD_TIMETABLE,
    meta: {
      year,
      semester,
    },
    payload: {
      promise: localforage.getItem(`timetable/${year}/${semester}`)
                          .then(JSON.parse),
    },
  };
}

export function saveTimetable({ year, semester, timetable }) {
  return {
    type: SAVE_TIMETABLE,
    payload: {
      promise: localforage.setItem(
        `timetable/${year}/${semester}`,
        JSON.stringify({
          savedAt: Date.now(),
          timetable,
        })),
    },
  };
}

export function dummy() {}
