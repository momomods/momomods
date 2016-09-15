import JsSearch from 'js-search';
import { FETCH_MODULES } from '../constants';

const defaultState = {
  data: {},
};

export default function searchIndex(state = defaultState, action) {
  switch (action.type) {
    case `${FETCH_MODULES}_FULFILLED`: {
      const search = new JsSearch.Search('id');
      search.addIndex('code');
      search.addIndex('name');
      search.addDocuments(action.payload.data.modules);

      return {
        ...state,
        data: {
          ...state.data,
          [action.meta.year]: {
            [action.meta.semester]: search,
          },
        },
      };
    }
    default:
      return state;
  }
}
