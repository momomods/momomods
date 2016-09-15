import { FETCH_MODULES } from '../constants';
import JsSearch from 'js-search';

const defaultState = {
  data: {},
};

export default function searchIndex(state = defaultState, action) {
  switch (action.type) {
    case `${FETCH_MODULES}_FULFILLED`:
      const searchIndex = new JsSearch.Search('id');
      searchIndex.addIndex('code');
      searchIndex.addIndex('name');
      searchIndex.addDocuments(action.payload.data.modules);

      return {
        ...state,
        data: {
          ...state.data,
          [action.meta.year]: {
            [action.meta.semester]: searchIndex,
          },
        },
      };
    default:
      return state;
  }
}
