import { FETCH_GROUPS } from '../constants';

export function fetchGroups({ year }) {
  return {
    type: FETCH_GROUPS,
    payload: {
      promise: Promise.resolve([]),
    },
  };
}
