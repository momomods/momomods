import { LOG_USER_IN, LOG_USER_OUT } from '../constants';

export function logUserIn({ user }) {
  return {
    type: LOG_USER_IN,
    payload: {
      user,
    },
  }
}

export function logUserOut() {
  return {
    type: LOG_USER_OUT,
    payload: {
      user: {},
    },
  }
}
