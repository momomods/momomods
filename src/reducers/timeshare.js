import { FETCH_GROUP_TIMETABLE } from '../constants';

const defaultState = {
  data: [],
  isFetching: false,
  isInitialized: false,
  lastFetched: null,
};

export default function timeshare(state = defaultState, action) {
  switch (action.type) {
    case `${FETCH_GROUP_TIMETABLE}_PENDING`:
      return {
        ...state,
        isFetching: true,
        lastFetched: null,
      };
    case `${FETCH_GROUP_TIMETABLE}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
        isInitialized: true,
        lastFetched: Date.now(),
      };
    case `${FETCH_GROUP_TIMETABLE}_REJECTED`:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
        isInitialized: false,
        lastFetched: null,
      };
    default:
      return state;
  }
}
