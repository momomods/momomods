import React, { PropTypes } from 'react';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { FIRST_HOUR, LAST_HOUR } from '../../utils/timetable';
import { convertIndexToTime, convertTimeToIndex } from '../../utils/timify';

import TimetableCell from './TimetableCell';
import s from './timetable.scss';

// Ref: https://github.com/yangshun/nusmods-v3/tree/master/src/js

const generateCells = (lessons, onLessonChange) => {
  const lessonsGroupedByStartTime = _(lessons).groupBy('StartTime').mapValues((value) => (
    value[0]
  )).value();
  const cells = [];
  const startingIndex = FIRST_HOUR * 2;
  const endingIndex = LAST_HOUR * 2;

  for (let i = startingIndex; i < endingIndex; i++) {
    const timeForIndex = convertIndexToTime(i);
    const lesson = lessonsGroupedByStartTime[timeForIndex];
    if (lesson) {
      const lessonStartIndex = i;
      const lessonEndIndex = convertTimeToIndex(lesson.EndTime);
      const width = lessonEndIndex - lessonStartIndex;
      cells.push(
        <TimetableCell
          key={i}
          width={width}
          lesson={lesson}
          onLessonChange={onLessonChange}
        />);
      i += (width - 1);
    } else {
      cells.push(<TimetableCell key={i} />);
    }
  }
  return cells;
};

const TimetableRow = (props) => (
  <div className="timetable-day-row" style={{ width: `${100/props.width}%` }}>
    {generateCells(props.lessons, props.onLessonChange)}
  </div>
);

TimetableRow.propTypes = {
  width: PropTypes.number,
  day: PropTypes.string,
  lessons: PropTypes.array,
  onLessonChange: PropTypes.func,
};

export default withStyles(s)(TimetableRow);
