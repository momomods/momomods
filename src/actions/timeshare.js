/* eslint-disable max-len */
import { FETCH_GROUP_TIMETABLE } from '../constants';
import { request } from './helpers';

export function fetchGroupTimetable({ groupId, date }) { // eslint-disable-line import/prefer-default-export
  const url = `/api/team/${groupId}?date=${date}`;

  return {
    type: FETCH_GROUP_TIMETABLE,
    meta: { groupId, date },
    payload: { promise: request(url) },
  };
}
