import { FETCH_FRIENDS } from '../constants';
import { request } from './helpers';

export function fetchFriends({ year, semester }) {
  const url = `/api/${year}/${semester}/friends`;
  console.log('action friend fetch');

  return {
    type: FETCH_FRIENDS,
    meta: { year, semester },
    payload: { promise: request(url) },
  };
}

export function dummy() {}
