import localforage from 'localforage';

import {
  ADD_MODULE,
  REMOVE_MODULE,

  FETCH_TIMETABLE,
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
  const url = `/api/${year}/${semester}/timetable`
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
 * @param {Object} module, module model
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
