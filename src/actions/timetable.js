import { FETCH_TIMETABLE } from '../constants';

/* Fetch timetable for current user for year and sem */
export function fetchTimetable({ year, sem }) {
  return {
    type: FETCH_TIMETABLE,
    payload: {
      promise: Promise.resolve([]),
    },
  };
}
