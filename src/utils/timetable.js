import _ from 'lodash';

// Ref: https://github.com/yangshun/nusmods-v3/tree/master/src/js

export const FIRST_HOUR = 8;
export const LAST_HOUR = 24;
export const CELLS_COUNT = ((LAST_HOUR - FIRST_HOUR) + 1) * 2;
export const LESSON_TYPE_ABBREV = {
  'Design Lecture': 'DLEC',
  Laboratory: 'LAB',
  Lecture: 'LEC',
  'Packaged Lecture': 'PLEC',
  'Packaged Tutorial': 'PTUT',
  Recitation: 'REC',
  'Sectional Teaching': 'SEC',
  'Seminar-Style Module Class': 'SEM',
  Tutorial: 'TUT',
  'Tutorial Type 2': 'TUT2',
  'Tutorial Type 3': 'TUT3',
};

// Filters a flat array of lessons and returns the lessons corresponding to lessonType.
export function lessonsForLessonType(lessons, lessonType) {
  console.log(lessons, lessonType);
  return _.filter(lessons, (lesson) => {
    return lesson.LessonType === lessonType;
  });
}
