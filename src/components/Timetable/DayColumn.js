import React, { PropTypes } from 'react';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './timetable.scss';
import { arrangeLessonsForWeek } from '../../utils/modules';
import TimetableBackground from './TimetableBackground';
import TimetableDayRow from './TimetableDayRow';
import TimeRow from './TimeRow';

// Ref: https://github.com/yangshun/nusmods-v3/tree/master/src/js

// Ignore Sundays since there is no school
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Timetable = () => {

  return (
    <div className="day-column">
      {DAYS.map((day) =>
        (<div className="timetable-cell"><span>{day}</span></div>)
      )}
    </div>
  );
};

// Timetable.propTypes = {
//   lessons: PropTypes.array,
//   timetable: PropTypes.object,
//   onLessonChange: PropTypes.func,
// };

export default withStyles(s)(Timetable);
