import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { submitTimetable } from '../actions/timetable';

class Sync extends Component {
  state = {
    sync: false,
  }

  componentDidMount() {
    // we don't want to call backend on every change in timetable
    // kinda batch it up to every 3 seconds max
    this.interval = setInterval(this.sync, 3000);
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      sync: (this.props.timetable !== nextProps.timetable),
    });
  }

  componentWillUnmount() {
    if (this.interval) clearTimeout(this.interval);
  }

  sync = () => {
    const {
      loggedIn,
      timetable,
      year,
      semester,
    } = this.props;

    if (!loggedIn) return;
    if (!timetable.isInitialized) return;

    const tt = (timetable.data
      && timetable.data[year]
      && timetable.data[year][semester]);

    if (this.state.sync) {
      this.props.submitTimetable({ year, semester, timetable: tt });
      this.setState({ sync: false });
    }
  }

  render() {
    return null;
  }
}

Sync.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  timetable: PropTypes.object.isRequired,
  year: PropTypes.string.isRequired,
  semester: PropTypes.string.isRequired,
  submitTimetable: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  year: state.selection.year,
  semester: state.selection.semester,
  loggedIn: !!state.user.data.id,
  timetable: state.timetable,
});

const mapDispatch = {
  submitTimetable,
};

export default connect(mapState, mapDispatch)(Sync);
