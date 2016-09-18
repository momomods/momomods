import {
  ADD_MODULE,
  REMOVE_MODULE,
  CHANGE_LESSON,
  CHANGE_TO_LESSON,
  CANCEL_CHANGE_LESSON,

  FETCH_TIMETABLE,
  LOAD_TIMETABLE,
} from '../constants';

/* data is a object mapping year, sem to timetable data
 * {
 *   '2016-2017': {
 *     '1': [{timetable_data_1}, {timetable_data_2}],
 *   },
 * }
 */
const defaultState = {
  data: {},
  isFetching: false,
  isInitialized: false,
  lastFetched: null,
  activeLesson: null,
};

export default function timetable(state = defaultState, action) {
  switch (action.type) {
    case `${LOAD_TIMETABLE}_PENDING`:
    case `${FETCH_TIMETABLE}_PENDING`:
      return {
        ...state,
        isFetching: true,
      };
    case `${LOAD_TIMETABLE}_FULFILLED`: {
      const { year, semester } = action.meta;
      const tt = (action.payload && action.payload.timetable) || [];
      return {
        ...state,
        data: {
          ...state.data,
          [year]: {
            [semester]: tt,
          },
        },
        isFetching: false,
        isInitialized: true,
      };
    }
    case `${FETCH_TIMETABLE}_FULFILLED`: {
      const { timetableModules } = action.payload;

      // this could be the first time a user visits,
      // so we have no timetableModule info
      // return normal state, when we save the timetable
      // it will be created in the backend
      if (!timetableModules) return state;

      const ttForDisplay = timetableModules.map(tm => {
        const { classNumber, lessonType, module } = tm;
        const tt = JSON.parse(module.timetable);
        const l = tt.find(t => (
          t.ClassNo === String(classNumber)
          && t.LessonType === lessonType));
        return {
          ...l,
          ModuleCode: module.code,
          ModuleTitle: module.title,
          moduleDetail: module,
        };
      });
      return {
        ...state,
        data: {
          ...state.data,
          [action.meta.year]: {
            [action.meta.semester]: ttForDisplay,
          },
        },
        isFetching: false,
        isInitialized: true,
        lastFetched: Date.now(),
      };
    }
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
          moduleDetail: module,
        }));

      // ensure timetable data is initialized, it could be null
      // if the user entered the app via the /module route,
      // because we only fetch timetable (and initialize timetable state)
      // when user enters app via /
      state.data[year] = state.data[year] || {};
      state.data[year][semester] = state.data[year][semester] || [];

      // for each lesson type, push a class onto timetable
      Object.keys(lessonTypeToX).forEach(k => (
        state.data[year][semester].push(lessonTypeToX[k])
      ));
      return {
        ...state,
        data: state.data,
      };
    }
    case `${REMOVE_MODULE}`: {
      const {
        year,
        semester,
        code,
      } = action.payload;

      const newData = state.data[year][semester].filter(m => m.ModuleCode !== code);

      return {
        ...state,
        data: {
          [year]: {
            [semester]: newData,
          },
        },
      };
    }
    case `${CHANGE_TO_LESSON}`: {
      const {
        year,
        semester,
        activeLesson,
      } = action.payload;

      // remove old class
      state.data[year][semester] = state.data[year][semester].filter(m =>
        !(m.ModuleCode === state.activeLesson.ModuleCode
          && m.LessonType === state.activeLesson.LessonType)
      );
      // remove isAvailable status and add in selected class
      activeLesson.isAvailable = false;
      state.data[year][semester].push(activeLesson);

      return {
        ...state,
        data: state.data,
        activeLesson: null,
      };
    }
    case `${CHANGE_LESSON}`: {
      const { activeLesson } = action.payload;

      return {
        ...state,
        activeLesson,
      };
    }
    case `${CANCEL_CHANGE_LESSON}`: {
      return {
        ...state,
        activeLesson: null,
      };
    }
    default:
      return state;
  }
}
