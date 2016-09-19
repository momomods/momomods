import { LOG_USER_IN, LOG_USER_OUT } from '../constants';

const defaultState = {
  isFetching: false,
  data: {},
};

export default function user(state = defaultState, action) {
  switch (action.type) {
    case LOG_USER_IN:
      return {
        isFetching: false,
        data: action.payload.user,
      };
    case `${LOG_USER_OUT}_FULFILLED`:
      return {
        isFetching: false,
        data: {},
      };
    default:
      return state;
  }
}
