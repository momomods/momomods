import { FETCH_GROUP_TIMETABLE } from '../constants';
import { postRequest, request } from './helpers';

export function fetchGroupTimetable({ groupId, date }) {
  const url = `/api/team/${groupId}?date=${date}`;

  return {
    type: FETCH_GROUP_TIMETABLE,
    meta: { groupId, date },
    payload: { promise: request(url) },
  }
}