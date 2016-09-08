import { FETCH_MODULES } from '../constants';

export function fetchModules({ year }) {
  return {
    type: FETCH_MODULES,
    payload: {
      promise: Promise.resolve([]),
    },
  };
}
