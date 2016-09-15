import {
  ADD_MODULE,
  REMOVE_MODULE,
  CHANGE_LESSON,

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
    case `${CHANGE_LESSON}`: {
      const {
        year,
        semester,
        code,
        lessonType,
        classNo,
      } = action.payload;

      //TODO: FIND NEW LESSON OBJECT
      console.log('module code', code);

      // const newData = state.data[year][semester].filter(m => 
      //   (m.ModuleCode === code &&
      //     m.LessonType === lessonType) ? m = newLesson : m);
      
      const newData = state.data[year][semester]

      return {
        ...state,
        data: {
          [year]: {
            [semester]: newData,
          },
        },
      };
    }
    default:
      return state;
  }
}
