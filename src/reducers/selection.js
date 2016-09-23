import {
  CHANGE_DATE,
  CHANGE_SEMESTER,
  CHANGE_YEAR,
} from '../constants';

const defaultState = {
  year: '2016-2017',
  semester: '1',
  date: new Date(),
};

/**
 * Update the currently selected academic year and semester.
 */
export default function selection(state = defaultState, action) {
  switch (action.type) {
    case CHANGE_DATE:
      return {
        ...state,
        date: action.payload.date,
      };
    case CHANGE_SEMESTER:
      return {
        ...state,
        semester: action.payload.semester,
      };
    case CHANGE_YEAR:
      return {
        ...state,
        year: action.payload.year,
      };
    default:
      return state;
  }
}
