import { FETCH_TIMETABLE } from '../constants';
import { fetchNusModsModuleDetail } from './module';

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
  return dispatch => (
    dispatch({
      type: FETCH_TIMETABLE,
      payload: {
        promise: Promise.resolve({ year, semester, data: [dummyData] }),
      },
    }).then(({ value }) => ({
      type: 'FETCH_TT_MODULES',
      payload: Promise.all(
        value.data.map(
          m => dispatch(
            fetchNusModsModuleDetail({ year, code: m.ModuleCode })))),
    }))
  );
}

export function dummy() {}
