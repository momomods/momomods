import { FETCH_GROUPS } from '../constants';

// data is a list of objects with group data, looks like:
// {
//   year: '2016-2017',
//   semester: '1',
//   data: [{group_data_1}, {group_data_2}],
// }
const defaultState = {
  data: [],
  isFetching: false,
  isInitialized: false,
  lastFetched: null,
};

export default function group(state = defaultState, action) {
  switch (action.type) {
    case `${FETCH_GROUPS}_PENDING`:
      return {
        ...state,
        isFetching: true,
        lastFetched: null,
      };
    case `${FETCH_GROUPS}_FULFILLED`:
      return {
        ...state,
        data: [action.payload, ...state.data],
        isFetching: false,
        isInitialized: true,
        lastFetched: Date.now(),
      };
    case `${FETCH_GROUPS}_REJECTED`:
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
