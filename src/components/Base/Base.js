import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from '../Header';
import Footer from '../Footer';
import { fetchTimetable, loadTimetable } from '../../actions/timetable';
import { fetchModules } from '../../actions/module';
import { fetchGroups } from '../../actions/group';

class Base extends Component {
  componentDidMount() {
    const {
      year,
      semester,
      group,
      module,
      timetable,
    } = this.props;

    if (!timetable.isInitialized) {
      if (this.props.loggedIn) {
        this.props.fetchTimetable({ year, semester });
      } else {
        this.props.loadTimetable({ year, semester });
      }
    }

    if (!module.isInitialized) {
      this.props.fetchModules({ year, semester });
    }

    if (!group.isInitialized) {
      this.props.fetchGroups({ year, semester });
    }
  }

  render() {
    return (
      <div>
        <Header
          title="mods+"
          activeTab={this.props.activeTab} />
          <div>
            { this.props.children }
          </div>
        <Footer />
      </div>
    )
  }
}

Base.propTypes = {
  activeTab: PropTypes.string,
};

const mapState = (state) => {
  const { timetable, selection, module, user, group } = state;
  const { year, semester } = selection;

  return {
    loggedIn: !!user.data.id,
    year,
    semester,
    group,
    module,
    timetable,
  }
};

const mapDispatch = {
  fetchTimetable,
  fetchModules,
  loadTimetable,
  fetchGroups,
};

export default connect(mapState, mapDispatch)(Base);
