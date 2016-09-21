import React, { PropTypes } from 'react';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { LESSON_TYPE_ABBREV } from '../../utils/timetable';
import s from './timetable.scss';

// Ref: https://github.com/yangshun/nusmods-v3/tree/master/src/js

const TimetableCell = (props) => {
  let timetableCell;

  const lesson = props.lesson;
  const time = props.time;
  const heightStyle = props.width ? { height: `${props.width * 2.777777777777}%` } : null;

  if (lesson) {
    const colorIndex = props.colors[lesson.ModuleCode];
    timetableCell = (
      <div
        className={classnames('timetable-module-cell', {
          'is-modifiable': lesson.isModifiable,
          'is-available': lesson.isAvailable,
          'is-active': lesson.isActive,
          [`color-${colorIndex}`]: true,
        })}

        onClick={() => {
          event.stopPropagation();
          props.onLessonChange(lesson);
        }}
      >
        <div className="cell-module-code">{lesson.ModuleCode}</div>
        <div>
          <span className="cell-module-lesson-type">{LESSON_TYPE_ABBREV[lesson.LessonType]}</span>
          <span className="cell-module-class">{' '}[{lesson.ClassNo}]</span>
        </div>
        <div><span className="cell-module-venue">{lesson.Venue}</span></div>
        { (lesson.WeekText === 'Every Week') ? null : 
          <span className="cell-module-week">{' '}[{lesson.WeekText}]</span>
        }
      </div>);
  } else if (time) {
    timetableCell = (<div className="time-label-cell">
      <div className="time-label">{time}</div>
    </div>
    );
  } else {
    timetableCell = null;
  }

  return (
    <div className="timetable-cell" style={heightStyle}>
      {timetableCell}
    </div>
  );
};

TimetableCell.propTypes = {
  lesson: PropTypes.object,
  width: PropTypes.number,
  time: PropTypes.string,
  onLessonChange: PropTypes.func,
  colors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  colors: state.theme.colors,
});

export default connect(mapStateToProps)(withStyles(s)(TimetableCell));
