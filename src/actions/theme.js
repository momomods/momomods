import localforage from 'localforage';
import {
  LOAD_THEME,
} from '../constants';

/*
 * Loads theme from local storage
 */
export function loadTheme() {
  return {
    type: LOAD_THEME,
    payload: {
      promise: localforage.getItem('theme').then(JSON.parse),
    },
  };
}

/*
 * Saves the current theme (mapping from module code to  color index
 * to local storage.
 */
export function saveTheme() {
  return (dispatch, getState) => {
    const theme = getState().theme;
    return dispatch({
      type: 'SAVE_COLORS',
      payload: {
        promise: localforage.setItem(
          'theme',
          JSON.stringify({
            savedAt: Date.now(),
            ...theme,
          })),
      },
    });
  };
}
