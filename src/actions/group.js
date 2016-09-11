import { FETCH_GROUPS } from '../constants';

/**
 * Fetch a user's groups for specified year and semester
 * Requires auth.
 *
 * @param {string} year, in the format of "YYYY-YYYY"
 * @param {string} semester, "1", "2", etc.
 */
export function fetchGroups({ year, semester }) {
  return {
    type: FETCH_GROUPS,
    payload: {
      promise: Promise.resolve({ year, semester, data: [] }),
    },
  };
}

export function dummy() {}
