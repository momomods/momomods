import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom'
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
const minColWidth = 100;
const dayRowWidth = 16.6666666666666;

class Timetable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTopOffset: 0
    };
  }
  componentDidMount() {
    const types = ['scroll', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll', 'resize', 'touchmove', 'touchend'];
    types.forEach((type) => {
      if (window.addEventListener) {
        findDOMNode(this.refs.timetableWrapper).addEventListener(type, this.onScroll.bind(this), false);
      } else {
        findDOMNode(this.refs.timetableWrapper).attachEvent('on' + type, this.onScroll.bind(this), false);
      }
    });
  }

  onScroll(event) {
    this.setState({
      scrollTopOffset: window.scrollY
    });
  }

  render () {
    const arrangedLessons = arrangeLessonsForWeek(this.props.lessons);
    const numCols = DAYS.reduce((prev, curr) => {
      return prev + (arrangedLessons[curr] ? arrangedLessons[curr].length : 1);
    }, 0);
    const width = window.innerWidth * 0.85;
    const style = {};
    const minInnerContainerWidth = minColWidth * numCols;
    if (minInnerContainerWidth > width) {
      style.minWidth = `${minInnerContainerWidth}px`
    }

    const headerStyle= {
      ...style,
      marginTop: `${this.state.scrollTopOffset - 40}px`
    };

    return (
      <div className="timetable-container theme-default">
        <div>
          { this.props.timetable.isFetching }
        </div>
        <TimeRow />
        <div className="timetable-inner-container" ref="timetableContainer">
          <div className="timetable-inner-wrapper" style={style} ref="timetableWrapper">
            <div className="timetable timetable-header" style={headerStyle}>
              {DAYS.map((day) => {
                const dayLessonRows = arrangedLessons[day];
                const size = dayLessonRows ? dayLessonRows.length : 1;
                return (
                  <div className="timetable-day" key={day} style={{
                    width: `${dayRowWidth * size}%`
                  }}>{day}</div>
                );
              })}
            </div>
            <div className="timetable" style={style}>
              {DAYS.map((day) => {
                const dayLessonRows = arrangedLessons[day];
                const size = dayLessonRows ? dayLessonRows.length : 1;
                return (
                  <TimetableDayRow
                    key={day}
                    width={`${dayRowWidth * size}%`}
                    size={size}
                    day={day.substring(0, 3)}
                    dayLessonRows={dayLessonRows}
                    onLessonChange={this.props.onLessonChange}
                  />
                )
              })}
            </div>
            <TimetableBackground />
          </div>
        </div>
      </div>
    );
  }
};

Timetable.propTypes = {
  lessons: PropTypes.array,
  timetable: PropTypes.object,
  onLessonChange: PropTypes.func,
};

export default withStyles(s)(Timetable);
