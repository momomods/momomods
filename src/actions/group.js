import { FETCH_GROUPS } from '../constants';

export function fetchGroups({ year, sem }) {
  return {
    type: FETCH_GROUPS,
    payload: {
      promise: Promise.resolve({ year, sem, data: [] }),
    },
  };
}

export function dummy() {}
