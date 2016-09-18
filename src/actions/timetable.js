import localforage from 'localforage';

import {
  ADD_MODULE,
  REMOVE_MODULE,
  CHANGE_LESSON,
  CHANGE_TO_LESSON,
  CANCEL_CHANGE_LESSON,

  FETCH_TIMETABLE,
  SUBMIT_TIMETABLE,
  LOAD_TIMETABLE,
  SAVE_TIMETABLE,
} from '../constants';
import { saveTheme } from './theme';
import { request } from './helpers';

/*
 * Save timetable to local storage.
 */
export function saveTimetable({ year, semester, timetable }) {
  return (dispatch, getState) => {
    let currentTimetable = null;
    // if timetable is not provided, read it from state
    if (!timetable || typeof timetable === 'undefined') {
      const allTimetables = getState().timetable.data;
      currentTimetable = (
        allTimetables
        && allTimetables[year]
        && allTimetables[year][semester]);
    }

    // cannot find timetable data, just return
    if (!currentTimetable) {
      return {};
    }

    return dispatch({
      type: SAVE_TIMETABLE,
      payload: Promise.all([
        localforage.setItem(
          `timetable/${year}/${semester}`,
          JSON.stringify({
            savedAt: Date.now(),
            timetable: currentTimetable,
          })),
        dispatch(saveTheme()),
      ]),
    });
  };
}


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
  return dispatch => {
    dispatch({
      type: ADD_MODULE,
      payload: {
        year,
        semester,
        module,
      },
    });
    return dispatch(saveTimetable({ year, semester }));
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
  return dispatch => {
    dispatch({
      type: REMOVE_MODULE,
      payload: {
        year,
        semester,
        code,
      },
    });
    return dispatch(saveTimetable({ year, semester }));
  };
}

/**
 * Change a class in a module in a timetable
 *
 * @param {string} year, in the format of "YYYY-YYYY"
 * @param {string} semester, "1", "2", etc.
 * @param {string} activeLesson, the lesson being modified
 */
export function changeLesson({ year, semester, activeLesson }) {
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
 * Change a class in a module in a timetable
 *
 * @param {string} year, in the format of "YYYY-YYYY"
 * @param {string} semester, "1", "2", etc.
 * @param {string} activeLesson, the new lesson selected
 */
export function changeToLesson({ year, semester, activeLesson }) {
  return dispatch => {
    dispatch({
      type: CHANGE_TO_LESSON,
      payload: {
        year,
        semester,
        activeLesson,
      },
    });
    return dispatch(saveTimetable({ year, semester }));
  };
}

/**
 * Cancel interaction to change lesson
 */
export function cancelChangeLesson() {
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
