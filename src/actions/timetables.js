import { loadModule } from './moduleBank';

// Ref: https://github.com/yangshun/nusmods-v3/tree/master/src/js

export const ADD_MODULE = 'ADD_MODULE';
export function addModule(semester, moduleCode) {
  return (dispatch) =>
    dispatch(loadModule(moduleCode)).then(() => {
      dispatch({
        type: ADD_MODULE,
        payload: {
          semester,
          moduleCode,
        },
      });
    });
}

export const REMOVE_MODULE = 'REMOVE_MODULE';
export function removeModule(semester, moduleCode) {
  return {
    type: REMOVE_MODULE,
    payload: {
      semester,
      moduleCode,
    },
  };
}
