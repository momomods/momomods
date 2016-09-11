import { FETCH_GROUPS } from '../constants';

const defaultState = {
  data: {},
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
        data: action.payload,
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
