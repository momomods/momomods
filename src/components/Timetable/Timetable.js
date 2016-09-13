import React, { PropTypes } from 'react';
// import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './timetable.scss';
import { arrangeLessonsForWeek } from '../../utils/modules';
import TimetableBackground from './TimetableBackground';
import TimetableDayRow from './TimetableDayRow';
import TimeRow from './TimeRow';

// Ref: https://github.com/yangshun/nusmods-v3/tree/master/src/js

// Ignore Sundays since there is no school
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Timetable = (props) => {
  const arrangedLessons = arrangeLessonsForWeek(props.lessons);

  return (
    <div className="timetable-container">
      <div>
        { props.timetable.isFetching }
      </div>
      <div className="timetable">
        <TimeRow />
        {DAYS.map((day) =>
          (<TimetableDayRow
            key={day}
            day={day.substring(0, 3)}
            dayLessonRows={arrangedLessons[day]}
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
