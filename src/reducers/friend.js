import { FETCH_FRIENDS } from '../constants';

const defaultState = {
  data: {},
  isFetching: false,
  isInitialized: false,
  lastFetched: null,
};

export default function friend(state = defaultState, action) {
  console.log(action);
  switch (action.type) {
    case `${FETCH_FRIENDS}_PENDING`: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case `${FETCH_FRIENDS}_FULFILLED`: {
      const { year, semester } = action.meta;
      const friends = action.payload;

      return {
        ...state,
        data: {
          [year]: {
            [semester]: action.payload,
          },
        },
        isFetching: false,
        isInitialized: false,
        lastFetched: Date.now(),
      };
    }
    default:
      return state;
  }
}

