import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Timetable extends Component {
  static propTypes = {
    timetable: PropTypes.object,
  }

  render() {
    const timetable = this.props.timetable;
    return (
      <div />
    );
  }
}

const mapState = (state) => {
  return {
    timetable: state.timetable,
  }
};

export default connect(mapState)(Timetable);
