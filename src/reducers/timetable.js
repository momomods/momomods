import { FETCH_TIMETABLE } from '../constants';

// data is a list of objects with timetable data, looks like:
// {
//   year: '2016-2017',
//   semester: '1',
//   data: [{timetable_data_1}, {timetable_data_2}],
// }
const defaultState = {
  data: [],
  isFetching: false,
  isInitialized: false,
  lastFetched: null,
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
        data: [action.payload, ...state.data],
        isFetching: false,
        isInitialized: true,
        lastFetched: Date.now(),
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
