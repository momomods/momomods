import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from '../Header';
import Sync from '../Sync';
import { fetchTimetable, loadTimetable } from '../../actions/timetable';
import { fetchModules } from '../../actions/module';
import { fetchGroups } from '../../actions/group';
import { loadTheme } from '../../actions/theme';
import { fetchFriends } from '../../actions/friend';

import SplashScreen from '../SplashScreen';

class Base extends Component {
  componentDidMount() {
    const {
      year,
      semester,
      group,
      module,
      timetable,
      friend,
    } = this.props;

    if (!timetable.isInitialized) {
      this.props.loadTimetable({ year, semester });
      if (this.props.loggedIn) {
        this.props.fetchTimetable({ year, semester });
      }
    }

    if (!module.isInitialized) {
      this.props.fetchModules({ year, semester });
    }

    if (!group.isInitialized) {
      if (this.props.loggedIn) {
        this.props.fetchGroups({ year, semester });
      }
    }

    if (!friend.isInitialized && this.props.loggedIn) {
      this.props.fetchFriends({ year, semester });
    }

    this.props.loadTheme();
  }

  render() {
    const loaded = this.props.timetable.isInitialized && this.props.module.isInitialized;

    return loaded ?
      <div>
        <Header
          title="mods+"
          activeTab={this.props.activeTab}
          isSemesterOne={this.props.isSemesterOne}
          handleSwitchSemester={this.props.handleSwitchSemester}
        />
        <div>
          { this.props.children }
        </div>
        <Sync />
      </div>
      :
      <SplashScreen />;
  }
}

Base.propTypes = {
  activeTab: PropTypes.string,
  loggedIn: PropTypes.bool.isRequired,
  year: PropTypes.string.isRequired,
  semester: PropTypes.string.isRequired,
  group: PropTypes.object.isRequired,
  module: PropTypes.object.isRequired,
  timetable: PropTypes.object.isRequired,
  friend: PropTypes.object.isRequired,
  fetchTimetable: PropTypes.func.isRequired,
  loadTimetable: PropTypes.func.isRequired,
  fetchModules: PropTypes.func.isRequired,
  fetchGroups: PropTypes.func.isRequired,
  fetchFriends: PropTypes.func.isRequired,
  loadTheme: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  isSemesterOne: PropTypes.bool.isRequired,
  handleSwitchSemester: PropTypes.func.isRequired,
};

const mapState = (state) => {
  const { timetable, selection, module, user, group, friend } = state;
  const { year, semester } = selection;

  return {
    loggedIn: !!user.data.id,
    year,
    semester,
    group,
    module,
    timetable,
    friend,
  };
};

const mapDispatch = {
  fetchTimetable,
  loadTimetable,

  fetchModules,
  fetchGroups,
  fetchFriends,

  loadTheme,
};

export default connect(mapState, mapDispatch)(Base);
