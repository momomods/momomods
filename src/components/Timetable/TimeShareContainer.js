import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { fetchGroup } from '../../actions/group'
import { timetableLessonsArray, isSameClass } from '../../utils/modules';
import { lessonsForLessonType } from '../../utils/timetable';
import Timeshare from './TimeShare';
import s from './timetable.scss';

// Ref: https://github.com/yangshun/nusmods-v3/tree/master/src/js

class TimeShareContainer extends Component {
  state = {};

  render() {
    const {
      year,
      semester,
      timetable,
      timetableForYearAndSem,
      semesterTimetable,
      semesterModuleList,
      teamId,
      group,
    } = this.props;

    return (
      <Timeshare
        timetable={timetable}
        group={group}
      />
    );
  }
}

TimeShareContainer.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  colors: PropTypes.object,
  teamId: PropTypes.number,
  group: PropTypes.object,
};


function mapStateToProps(state) {
  return {
    loggedIn: !!state.user.data.id,
  };
}

const mapDispatch = {
  fetchGroup,
};

export default connect(mapStateToProps, mapDispatch)(withStyles(s)(TimeShareContainer));
