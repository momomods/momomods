import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import TimetableRow from './TimetableRow';
import s from './timetable.scss';

// Ref: https://github.com/yangshun/nusmods-v3/tree/master/src/js

const dayRowWidth = 16.6666666666666;

const TimetableDayRow = (props) => {
  const size = props.dayLessonRows ? props.dayLessonRows.length : 1;
  const style = {
    width: `${dayRowWidth * size}%`
  };
  return (
    <div className="timetable-day" style={style}>
      {props.dayLessonRows ?
        props.dayLessonRows.map((dayLessonRow, i) => (
          <TimetableRow
            day={i === 0 ? props.day : ''}
            key={i}
            lessons={dayLessonRow}
            width={size}
            onLessonChange={props.onLessonChange}
          />)) : <TimetableRow day={props.day} />
      }
    </div>
  );
}

TimetableDayRow.propTypes = {
  day: PropTypes.string,
  dayLessonRows: PropTypes.array,
  onLessonChange: PropTypes.func,
};

export default withStyles(s)(TimetableDayRow);
