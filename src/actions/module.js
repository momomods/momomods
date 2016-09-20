import {
  FETCH_MODULES,
  FETCH_NUS_MODS_MODULES,
  FETCH_NUS_MODS_DETAIL,
  FETCH_NUS_MODS_MODULES_LIST,
} from '../constants';
import { request } from './helpers';

/**
 * Fetch all modules for specified year and semester
 * Does not require auth.
 *
 * @param {string} year, in the format of "YYYY-YYYY"
 * @param {string} semester, "1", "2", etc.
 */
export function fetchModules({ year, semester }) {
  const query = `
    {
      modules(year:"${year}", semester:"${semester}") {
        id,
        year,
        semester,
        code,
        title,
        description,
        department,
        credit,
        workload,
        prerequisite,
        preclusion,
        examDate,
        timetable
      }
    }`;
  const url = `/graphql?query=${query}`;
  return {
    type: FETCH_MODULES,
    meta: {
      year,
      semester,
    },
    payload: {
      promise: request(url),
    },
  };
}

export function fetchNusModsModuleList({ year }) {
  const url = `https://nusmods.com/api/${year}/moduleList.json`;
  return {
    type: FETCH_NUS_MODS_MODULES_LIST,
    payload: {
      promise: request(url),
    },
  };
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
