/* eslint-disable react/no-string-refs, react/no-find-dom-node */

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './timetable.scss';
import { arrangeLessonsWithinDay } from '../../utils/modules';
import TimetableBackground from './TimetableBackground';
import TimetableDayRow from './TimetableDayRow';
import TimeRow from './TimeRow';

// Ref: https://github.com/yangshun/nusmods-v3/tree/master/src/js

const minColWidth = 20;
const types = [
  'scroll',
  'mousewheel',
  'DOMMouseScroll',
  'MozMousePixelScroll',
  'resize',
  'touchmove',
  'touchend',
];

class Timeshare extends Component {

  constructor(props) {
    super(props);
    this.state = {
      scrollTopOffset: 0,
    };
  }

  componentDidMount() {
    types.forEach((type) => {
      findDOMNode(this.refs.timetableWrapper)
        .addEventListener(type, this.onScroll.bind(this), false);
    });
  }

  componentWillUnmount() {
    types.forEach((type) => {
      findDOMNode(this.refs.timetableWrapper)
        .removeEventListener(type, this.onScroll.bind(this), false);
    });
  }

  onScroll() {
    this.setState({
      scrollTopOffset: window.scrollY,
    });
  }

  render() {
    const { group } = this.props;
    const numCols = group.members.length || 0;
    const width = window.innerWidth * 0.85;
    const style = {};
    const minInnerContainerWidth = minColWidth * numCols;
    if (minInnerContainerWidth > width) {
      style.minWidth = `${minInnerContainerWidth}px`;
    } else {
      style.width = '90%';
    }

    const headerStyle = {
      marginTop: `${this.state.scrollTopOffset - 40}px`,
    };

    return (
      <div className="timetable-container theme-default">
        <TimeRow />
        <div className="timetable-inner-container" ref="timetableContainer">
          <div className="timetable-inner-wrapper" style={style} ref="timetableWrapper">
            <div className="timetable timetable-header" style={headerStyle}>
              {group.members.map((member) => (
                <div className="timetable-day" key={member.name}>{member.name}</div>
              ))}
            </div>
            <div className="timetable" style={style}>
              { group.members.map((member) => (
                <TimetableDayRow
                  key={member.name}
                  day={member.name}
                  dayLessonRows={arrangeLessonsWithinDay(member.timetable)}
                />))
              }
            </div>
            <TimetableBackground />
          </div>
        </div>
      </div>
    );
  }
}

Timeshare.propTypes = {
  lessons: PropTypes.array,
  timetable: PropTypes.object,
  onLessonChange: PropTypes.func,
  group: PropTypes.object,
};

export default withStyles(s)(Timeshare);
