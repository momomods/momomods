import { FETCH_MODULES } from '../constants';

export function fetchModules({ year, sem }) {
  return {
    type: FETCH_MODULES,
    payload: {
      promise: Promise.resolve({ year, sem, data: [] }),
    },
  };
}

export function dummy() {}
