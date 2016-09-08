import { FETCH_TIMETABLE } from '../constants';

const defaultState = {
  isFetching: false,
  isInitialized: false,
  data: [],
};

export default function timetable(state = defaultState, action) {
  switch (action.type) {
    case `${FETCH_TIMETABLE}_PENDING`:
      return {
        ...state,
        isFetching: true,
      };
    case `${FETCH_TIMETABLE}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        isInitialized: true,
        data: action.payload,
      };
    case `${FETCH_TIMETABLE}_REJECTED`:
      return {
        ...state,
        isFetching: false,
        isInitialized: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
