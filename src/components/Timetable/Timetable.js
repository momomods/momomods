import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const TimetableComponent = ({ timetable }) => (
  <div>
    { timetable.isFetching }
  </div>
);

TimetableComponent.propTypes = {
  timetable: PropTypes.object,
};

const mapState = (state) => ({
  timetable: state.timetable,
});

export default connect(mapState)(TimetableComponent);
