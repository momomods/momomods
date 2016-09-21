import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { fetchGroup } from '../../actions/group';
import Timeshare from './TimeShare';
import s from './timetable.scss';

// Ref: https://github.com/yangshun/nusmods-v3/tree/master/src/js

class TimeShareContainer extends Component {
  state = {};

  render() {
    const {
      timetable,
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
  colors: PropTypes.object,
  group: PropTypes.object,
};

const mapDispatch = {
  fetchGroup,
};

export default connect(null, mapDispatch)(withStyles(s)(TimeShareContainer));
