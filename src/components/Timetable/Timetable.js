import React, { PropTypes } from 'react';
// import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './timetable.scss';
import { arrangeLessonsForWeek } from '../../utils/modules';
import TimetableBackground from './TimetableBackground';
import TimetableDayRow from './TimetableDayRow';

// Ref: https://github.com/yangshun/nusmods-v3/tree/master/src/js

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const Timetable = (props) => {
  const arrangedLessons = arrangeLessonsForWeek(props.lessons);

  return (
    <div className="timetable-container">
      <div>
        { props.timetable.isFetching }
      </div>
      <div className="timetable">
        {WEEKDAYS.map((weekday) =>
          (<TimetableDayRow
            key={weekday}
            day={weekday.substring(0, 3)}
            dayLessonRows={arrangedLessons[weekday]}
          />)
        )}
      </div>
      <TimetableBackground />
    </div>
  );
};

Timetable.propTypes = {
  lessons: PropTypes.array,
  timetable: PropTypes.object,
};

export default withStyles(s)(Timetable);
