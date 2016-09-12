import { FETCH_MODULES, FETCH_NUS_MODS_MODULES } from '../constants';

const defaultState = {
  data: {},
  isFetching: false,
  isInitialized: false,
  lastFetched: null,
};

export default function module(state = defaultState, action) {
  switch (action.type) {
    case `${FETCH_MODULES}_PENDING`:
      return {
        ...state,
        isFetching: true,
        lastFetched: null,
      };
    case `${FETCH_MODULES}_FULFILLED`:
      return {
        ...state,
        data: {
          ...state.data,
          [action.meta.year]: {
            [action.meta.semester]: action.payload.data.modules,
          },
        },
        isFetching: false,
        isInitialized: true,
        lastFetched: Date.now(),
      };
    case `${FETCH_MODULES}_REJECTED`:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
        isInitialized: false,
        lastFetched: null,
      };
    case `${FETCH_NUS_MODS_MODULES}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
        isInitialized: true,
        lastFetched: Date.now(),
      };
    default:
      return state;
  }
}
