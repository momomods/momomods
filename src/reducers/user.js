import { LOG_USER_IN, LOG_USER_OUT } from '../constants';

export default function user(state = {}, action) {
  switch (action.type) {
    case LOG_USER_IN:
      return {
        ...action.payload.user,
      };
    case LOG_USER_OUT:
      return {};
    default:
      return state;
  }
}
