import { FETCH_TIMETABLE } from '../constants';

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
    payload: {
      promise: Promise.resolve({ year, semester, data: [] }),
    },
  };
}

export function dummy() {}
