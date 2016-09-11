import { CHANGE_SEMESTER, CHANGE_YEAR } from '../constants';

export function changeSemester({ semester }) {
  return {
    type: CHANGE_SEMESTER,
    payload: {
      semester,
    },
  };
}

export function changeYear({ year }) {
  return {
    type: CHANGE_YEAR,
    payload: {
      year,
    },
  };
}
