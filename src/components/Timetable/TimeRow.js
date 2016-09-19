import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FIRST_HOUR, LAST_HOUR } from '../../utils/timetable';
import TimetableCell from './TimetableCell';
import s from './timetable.scss';

const TIME = ['0600', '0700', '0800', '0900', '1000',
              '1100', '1200', '1300', '1400', '1500',
              '1600', '1700', '1800', '1900', '2000',
              '2100', '2200', '2300', '2359'];

const generateCells = () => {
  const cells = [];
  const startingIndex = FIRST_HOUR * 2;
  const endingIndex = LAST_HOUR * 2; // add in two cells for day label buffer

  for (let i = 0; i < endingIndex - startingIndex; i++) {
    const timeIndex = i; // translate time one cell up
    if (timeIndex % 2 === 0) {
      cells.push(<TimetableCell key={i} time={TIME[timeIndex / 2]} />);
    } else {
      cells.push(<TimetableCell key={i} />);
    }
  }
  return cells;
};

const TimeRow = () => (
  <div className="time-row">
    {generateCells()}
  </div>
);

export default withStyles(s)(TimeRow);
