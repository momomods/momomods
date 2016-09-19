import { LOG_USER_IN, LOG_USER_OUT } from '../constants';
import { postRequest } from './helpers';


/**
 * Mark current user as logged in with the specified user info.
 *
 * @param {Object} user
 * @param {string} user.id
 * @param {string} user.email
 */
export function logUserIn({ user }) {
  return {
    type: LOG_USER_IN,
    payload: {
      user,
    },
  };
}

/**
 * Mark current user as logged out
 */
export function logUserOut() {
  const url = `/logout`;

  return {
    type: LOG_USER_OUT,
    payload: {
      promise: postRequest(url),
    },
  };
}
