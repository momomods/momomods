import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './timetable.scss';

// Ignore Sundays since there is no school
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Timetable = () => (
  <div className="day-column">
    {DAYS.map((day) =>
      (<div className="timetable-cell"><span>{day}</span></div>)
    )}
  </div>
);

export default withStyles(s)(Timetable);
