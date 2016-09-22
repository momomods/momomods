import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { fetchGroup } from '../../actions/group';
import Timeshare from './TimeShare';
import s from './timetable.scss';

// Ref: https://github.com/yangshun/nusmods-v3/tree/master/src/js

class TimeShareContainer extends Component {
  state = { isSharing: true };

  render() {
    const {
      timetable,
      group,
    } = this.props;

    return (
      <Timeshare
        timetable={timetable}
        group={group}
        isSharing={this.state.isSharing}
      />
    );
  }
}

TimeShareContainer.propTypes = {
  colors: PropTypes.object,
  group: PropTypes.object,
  timetable: PropTypes.object.isRequired,
};

const mapState = (state) => ({
  timetable: state.timetable,
});

const mapDispatch = {
  fetchGroup,
};

export default connect(mapState, mapDispatch)(withStyles(s)(TimeShareContainer));
