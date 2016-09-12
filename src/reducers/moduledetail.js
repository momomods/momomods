import { FETCH_NUS_MODS_DETAIL } from '../constants';

const defaultState = {
  data: {},
  isFetching: false,
  isInitialized: false,
  lastFetched: null,
};

export default function moduledetail(state = defaultState, action) {
  switch (action.type) {
    case `${FETCH_NUS_MODS_DETAIL}_PENDING`:
      return {
        ...state,
        isFetching: true,
      };
    case `${FETCH_NUS_MODS_DETAIL}_FULFILLED`:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.ModuleCode]: action.payload,
        },
        isFetching: false,
        isInitialized: true,
        lastFetched: Date.now(),
      };
    default:
      return state;
  }
}
