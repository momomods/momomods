import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import TimetableRow from './TimetableRow';
import s from './timetable.scss';

// Ref: https://github.com/yangshun/nusmods-v3/tree/master/src/js

const TimetableDayRow = (props) => {
  const style = {
    width: props.width,
  };
  return (
    <div className="timetable-day" style={style}>
      {props.dayLessonRows ?
        props.dayLessonRows.map((dayLessonRow, i) => (
          <TimetableRow
            key={i}
            lessons={dayLessonRow}
            width={props.size}
            onLessonChange={props.onLessonChange}
            isSharing={props.isSharing}
          />)) : <TimetableRow />
      }
    </div>
  );
};

TimetableDayRow.propTypes = {
  day: PropTypes.string,
  dayLessonRows: PropTypes.array,
  onLessonChange: PropTypes.func,
  width: PropTypes.string,
  isSharing: PropTypes.bool,
};

export default withStyles(s)(TimetableDayRow);
