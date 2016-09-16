import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { CELLS_COUNT } from '../../utils/timetable';
import s from './timetable.scss';

// Ref: https://github.com/yangshun/nusmods-v3/tree/master/src/js

const TimetableBackground = () => (
  <div className={classnames('timetable', 'timetable-bg')}>
    <div className={classnames('timetable-day')}>
      <div className={classnames('timetable-day-row')}>
        <div className={classnames('timetable-day-cell', 'timetable-d')}><span /></div>
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

export default withStyles(s)(TimetableBackground);
