import _ from 'lodash';
import fetch from '../core/fetch';

// Ref: https://github.com/yangshun/nusmods-v3/tree/master/src/js

export const RESET_REQUEST_STATE = 'RESET_REQUEST_STATE';
export function resetRequestState(domain) {
  return {
    type: RESET_REQUEST_STATE,
    payload: _.isArray(domain) ? domain : [domain],
  };
}

export const RESET_ERROR_STATE = 'RESET_ERROR_STATE';
export function resetErrorState(domain) {
  return {
    type: RESET_ERROR_STATE,
    payload: _.isArray(domain) ? domain : [domain],
  };
}

export const RESET_ALL_STATE = 'RESET_ALL_STATE';
export function resetAllState() {
  return {
    type: RESET_ALL_STATE,
  };
}

const defaultOptions = {
  credentials: 'include',
}

export function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      ...defaultOptions,
      ...options,
    })
      .then(response => response.json())
      .then(response => resolve(response))
      .catch(reject);
  });
}
