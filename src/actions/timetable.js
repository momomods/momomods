import { SHOW_TIMETABLE } from '../constants';

export function showTimetable({ year, sem }) {
  return {
    type: 'SHOW_TIMETABLE',
    payload: {
      promise: Promise.resolve([]),
    },
  }
}
