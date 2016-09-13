import {
  ADD_MODULE,
  FETCH_TIMETABLE,
} from '../constants';

// data is a list of objects with timetable data, looks like:
// {
//   year: '2016-2017',
//   semester: '1',
//   data: [{timetable_data_1}, {timetable_data_2}],
// }
const defaultState = {
  data: {},
  isFetching: false,
  isInitialized: false,
  lastFetched: null,
};

export default function timetable(state = defaultState, action) {
  switch (action.type) {
    case `${FETCH_TIMETABLE}_PENDING`:
      return {
        ...state,
        isFetching: true,
      };
    case `${FETCH_TIMETABLE}_FULFILLED`:
      return {
        ...state,
        data: {
          ...state.data,
          [action.meta.year]: {
            [action.meta.semester]: action.payload.data,
          },
        },
        isFetching: false,
        isInitialized: true,
        lastFetched: Date.now(),
      };
    case `${FETCH_TIMETABLE}_REJECTED`:
      return {
        ...state,
        isFetching: false,
        isInitialized: false,
        error: action.payload,
      };
    case `${ADD_MODULE}`: {
      const {
        year,
        semester,
        module,
      } = action.payload;

      const tt = JSON.parse(module.timetable || null);
      // if selected module has no timetable, just pretend it's not added
      if (!tt) return state;

      const lessonTypeToX = {};
      // each lesson type can have potentially many class no,
      // for simplicity we just get the first lesson of each lesson type first
      tt.forEach(l => (
        lessonTypeToX[l.LessonType] = lessonTypeToX[l.LessonType] || {
          ...l,
          ModuleCode: module.code,
          ModuleTitle: module.title,
        }));

      // for each lesson type, push a class onto timetable
      Object.keys(lessonTypeToX).forEach(k => (
        state.data[year][semester].push(lessonTypeToX[k])
      ));
      return {
        ...state,
        data: state.data,
      };
    }
    default:
      return state;
  }
}
