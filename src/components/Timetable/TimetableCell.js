import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { LESSON_TYPE_ABBREV } from '../../utils/timetable';
import s from './timetable.scss';

// Ref: https://github.com/yangshun/nusmods-v3/tree/master/src/js

const TimetableCell = (props) => {
  let timetableCell;

  const lesson = props.lesson;
  const time = props.time;
  const widthStyle = props.width ? { flexGrow: props.width } : null;

  if (lesson) {
    timetableCell = (<div className="timetable-module-cell">
      <div className="cell-module-code">{lesson.ModuleCode}</div>
      <div>
        <span className="cell-module-lesson-type">{LESSON_TYPE_ABBREV[lesson.LessonType]}</span>
        <span className="cell-module-class">{' '}[{lesson.ClassNo}]</span>
      </div>
      <div><span className="cell-module-venue">{lesson.Venue}</span></div>
    </div>);
  } else if (time) {
    timetableCell = (<div className="time-label-cell">
      <div className="time-label">{time}</div>
    </div>
    );
  } else {
    timetableCell = null;
  }

  return (
    <div className="timetable-cell" style={widthStyle} >
      {timetableCell}
    </div>
  );
};

TimetableCell.propTypes = {
  lesson: PropTypes.object,
  width: PropTypes.number,
  time: PropTypes.string,
};

export default withStyles(s)(TimetableCell);
