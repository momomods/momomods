import { CREATE_GROUP, DELETE_GROUP, FETCH_GROUPS, UPDATE_GROUP } from '../constants';
import { postRequest, request } from './helpers';

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

export function updateGroup({ id, name, members }) {
  const url = `/api/team/${id}`;
  return {
    type: UPDATE_GROUP,
    meta: { id, name, members },
    payload: {
      promise: postRequest(url, {
        body: JSON.stringify({
          name,
          members,
        }),
      }),
    },
  };
}

export function createGroup({ year, semester, name, members }) {
  const url = `/api/${year}/${semester}/team`;
  return dispatch => (
    dispatch({
      type: CREATE_GROUP,
      payload: {
        promise: postRequest(url, {
          body: JSON.stringify({
            name,
            members,
          }),
        }),
      },
    }).then(({ value }) => (
      // using the teamId from creating the group, update the group with the name and members
      dispatch(updateGroup({
        id: value.teamId,
        name,
        members,
      }))
    ))
  );
}

export function deleteGroup({ id }) {
  const url = `/api/team/${id}`;
  return {
    type: DELETE_GROUP,
    meta: { id },
    payload: {
      promise: request(url, {
        method: 'delete',
      }),
    },
  };
}
