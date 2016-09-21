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

    // add in dummy data
    group.members.forEach((member) => {
      member.timetable = [ // eslint-disable-line no-param-reassign
        {
          id: 2,
          timetableId: 1,
          moduleId: 514,
          lessonType: 'sectional',
          classNumber: 1,
          createdAt: '2016-09-12T08:26:51.449Z',
          updatedAt: '2016-09-12T08:26:51.449Z',
          module: {
            id: 514,
            year: '2016-2017',
            semester: 1,
            code: 'CS1010',
            title: 'Programming Methodology',
            description: 'This is 1010.',
            department: 'Computer Science',
            credit: 4,
            workload: '2-1-1-3-3',
            prerequisite: null,
            preclusion: 'CG1101, CS1010E',
            examDate: '2016-11-23T01:00:00.000Z',
            timetable: '',
            createdAt: '2016-09-12T08:33:46.506Z',
            updatedAt: '2016-09-12T08:33:46.507Z',
          },
        },
        {
          id: 3,
          timetableId: 1,
          moduleId: 522,
          lessonType: 'sectional',
          classNumber: 1,
          createdAt: '2016-09-12T08:26:51.450Z',
          updatedAt: '2016-09-12T08:26:51.450Z',
          module: {
            id: 522,
            year: '2016-2017',
            semester: 1,
            code: 'CS1231',
            title: 'Discrete Structures',
            description: 'This module introduces mathematical tools required in the study of computer science. Topics include: (1) Logic and proof techniques: propositions, conditionals, quantifications. (2) Relations and Functions: Equivalence relations and partitions. Partially ordered sets. Well-Ordering Principle. Function equality. Boolean/identity/inverse functions. Bijection. (3) Mathematical formulation of data models (linear model, trees, graphs). (4) Counting and Combinatoric: Pigeonhole Principle. Inclusion-Exclusion Principle. Number of relations on a set, number of injections from one finite set to another, Diagonalisation proof: An infinite countable set has an uncountable power set; Algorithmic proof: An infinite set has a countably infinite subset. Subsets of countable sets are countable.', // eslint-disable-line max-len
            department: 'Computer Science',
            credit: 4,
            workload: '3-1-0-3-3',
            prerequisite: 'A-level Mathematics or H2 Mathematics or MA1301 or MA1301FC or MA1301X',
            preclusion: 'MA1100',
            examDate: '2016-11-23T09:00:00.000Z',
            timetable: '[]',
            createdAt: '2016-09-12T08:33:46.542Z',
            updatedAt: '2016-09-12T08:33:46.542Z',
          },
        },
      ];
    });

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
