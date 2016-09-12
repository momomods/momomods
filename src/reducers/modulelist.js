import { FETCH_NUS_MODS_MODULES_LIST } from '../constants';

const defaultState = {
  data: [],
  isFetching: false,
  isInitialized: false,
  lastFetched: null,
};

export default function modulelist(state = defaultState, action) {
  switch (action.type) {
    case `${FETCH_NUS_MODS_MODULES_LIST}_PENDING`:
      return {
        ...state,
        isFetching: true,
        lastFetched: null,
      };
    case `${FETCH_NUS_MODS_MODULES_LIST}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
        isInitialized: true,
        lastFetched: Date.now(),
      };
    case `${FETCH_NUS_MODS_MODULES_LIST}_REJECTED`:
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
