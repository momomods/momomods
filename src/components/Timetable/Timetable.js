import React, { Component, PropTypes } from 'react';

class Timetable extends Component {
  render() {
    const timetable = this.props.timetable;
    return (
      <div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    timetable: state.timetable,
  }
};

export default connect(mapState)(Timetable);
