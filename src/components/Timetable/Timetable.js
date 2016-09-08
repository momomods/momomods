import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const Timetable = ({ timetable }) => (
  <div>
    {timetable}
  </div>
);

Timetable.propTypes = {
  timetable: PropTypes.object,
};

const mapState = (state) => ({
  timetable: state.timetable,
});

export default connect(mapState)(Timetable);
