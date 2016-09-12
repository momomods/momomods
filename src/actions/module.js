import { FETCH_MODULES, FETCH_NUS_MODS_MODULES, FETCH_NUS_MODS_DETAIL } from '../constants';
import fetch from '../core/fetch';

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

export function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(response => response.json())
      .then(response => resolve(response))
      .catch(reject);
  });
}

export function fetchNusModsModules({ year }) {
  const url = `https://nusmods.com/api/${year}/modules.json`;
  return {
    type: FETCH_NUS_MODS_MODULES,
    payload: {
      promise: request(url),
    },
  };
}

export function fetchNusModsModuleDetail({ year, code }) {
  const url = `https://nusmods.com/api/${year}/modules/${code}.json`;
  return {
    type: FETCH_NUS_MODS_DETAIL,
    payload: {
      promise: request(url),
    },
  };
}

export function dummy() {}
