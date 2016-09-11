import { FETCH_MODULES } from '../constants';

/**
 * Fetch all modules for specified year and semester
 * Does not require auth.
 *
 * @param {string} year, in the format of "YYYY-YYYY"
 * @param {string} semester, "1", "2", etc.
 */
export function fetchModules({ year, semester }) {
  return {
    type: FETCH_MODULES,
    payload: {
      promise: Promise.resolve({ year, semester, data: [] }),
    },
  };
}

export function dummy() {}
