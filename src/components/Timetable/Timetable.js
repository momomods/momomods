import React, { PropTypes } from 'react';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './timetable.scss';
import { arrangeLessonsForWeek } from '../../utils/modules';
import TimetableBackground from './TimetableBackground';
import TimetableDayRow from './TimetableDayRow';
import TimeRow from './TimeRow';
import DayColumn from './DayColumn';

// Ref: https://github.com/yangshun/nusmods-v3/tree/master/src/js

// Ignore Sundays since there is no school
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Timetable = (props) => {
  const arrangedLessons = arrangeLessonsForWeek(props.lessons);

  return (
    <div className="timetable-container theme-default">
      <div>
        { props.timetable.isFetching }
      </div>
      <TimeRow />
      <div className="timetable-inner-container">
        <DayColumn />
        <div className="timetable">
          <div className={classnames('timetable', 'timetable-days')}>
            {DAYS.map((day) =>
              (<TimetableDayRow
                key={day}
                day={day.substring(0, 3)}
                dayLessonRows={arrangedLessons[day]}
                onLessonChange={props.onLessonChange}
              />)
            )}
          </div>
        </div>
        <TimetableBackground />
      </div>
    </div>
  );
};

Timetable.propTypes = {
  lessons: PropTypes.array,
  timetable: PropTypes.object,
  onLessonChange: PropTypes.func,
};

export default withStyles(s)(Timetable);
