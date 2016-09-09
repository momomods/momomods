import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const Timetable = ({ timetable }) => (
  <div>
    { timetable.isFetching }
  </div>
);

Timetable.propTypes = {
  timetable: PropTypes.object,
};

const mapState = (state) => ({
  timetable: state.timetable,
});

const ExportTimetable = connect(mapState)(Timetable);
export { ExportTimetable };
