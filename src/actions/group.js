import {
  FETCH_GROUPS,
  ADD_GROUP,
  EDIT_GROUP,
  CHANGE_GROUP,
} from '../constants';

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
    meta: {
      year,
      semester,
    },
    payload: {
      promise: request(url),
    },
  };
}

export function addGroup({ year, semester, teamName}) {
  const url = `/api/${year}/${semester}/team`;
  return {
    type: ADD_GROUP,
    meta: {
      year,
      semester,
    },
    payload: {
      promise: postRequest(url, {
        body: JSON.stringify(teamName),
      }),
    },
  };
}

// TODO: Add/ delete friends?
export function editGroup({ year, semester }) {
  return {
    type: EDIT_GROUP,
    payload: {
      promise: Promise.resolve({ year, semester, data: [] }),
    },
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
