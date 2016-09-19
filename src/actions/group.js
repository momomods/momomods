import { FETCH_GROUPS } from '../constants';
import { request } from './helpers';

/**
 * Fetch a user's groups for specified year and semester
 * Requires auth.
 *
 * @param {string} year, in the format of "YYYY-YYYY"
 * @param {string} semester, "1", "2", etc.
 */
export function fetchGroups({ year, semester }) {
  const url = `/api/${year}/${semester}/team`;

  return {
    type: FETCH_GROUPS,
    meta: { year, semester },
    payload: { promise: request(url) },
  };
}

/**
 * Select the group to be displayed
 *
 * @param {string} year, in the format of "YYYY-YYYY"
 * @param {string} semester, "1", "2", etc.
 * @param {string} groupId, id of the group to be displayed
 */
export function changeGroup({ year, semester, groupId}) {
  return {
    type: CHANGE_GROUP,
    payload: {
      year,
      semester,
      groupId,
    },
  };
}

export function dummy() {}
