import { FETCH_TIMETABLE } from '../constants';

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
    payload: {
      promise: Promise.resolve({ year, semester, data: [dummyData] }),
    },
  };
}

export function dummy() {}
