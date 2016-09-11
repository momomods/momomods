import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import TimetableRow from './TimetableRow';
import s from './timetable.scss';

// Ref: https://github.com/yangshun/nusmods-v3/tree/master/src/js

const TimetableDayRow = (props) => (
  <div className="timetable-day">
    {props.dayLessonRows ?
      props.dayLessonRows.map((dayLessonRow, i) => (
        <TimetableRow day={i === 0 ? props.day : ''} key={i} lessons={dayLessonRow} />
      )) : <TimetableRow day={props.day} />
    }
  </div>
);

TimetableDayRow.propTypes = {
  day: PropTypes.string,
  dayLessonRows: PropTypes.array,
};

export default withStyles(s)(TimetableDayRow);
