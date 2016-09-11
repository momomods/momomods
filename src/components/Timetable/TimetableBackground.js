import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { CELLS_COUNT } from '../../utils/timetable';
import s from './timetable.scss';

// Ref: https://github.com/yangshun/nusmods-v3/tree/master/src/js

const TimetableBackground = () => {
  const timetableBgClassName = classnames('timetable', 'timetable-bg');
  const timetableDayClassName = classnames('timetable-day');
  const timetableDayRowClassName = classnames('timetable-day-row');
  const timetableDayCellClassName = classnames('timetable-day-cell', 'timetable-d');

  return (
    <div className={timetableBgClassName}>
      <div className={timetableDayClassName}>
        <div className={timetableDayRowClassName}>
          <div className={timetableDayCellClassName}><span /></div>
          {_.map(_.range(CELLS_COUNT), (i) =>
            (
            <div
              key={i} className={classnames('timetable-cell', {
                'timetable-cell-alt': i % 4 < 2,
              })}
            />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default withStyles(s)(TimetableBackground);
