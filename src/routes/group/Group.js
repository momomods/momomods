/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';

import GroupToolbar from '../../components/GroupToolbar/GroupToolbar';
import Link from '../../components/Link/Link';
import TimeShareContainer from '../../components/Timetable/TimeShareContainer';

import s from './Group.css';
import { fetchGroups } from '../../actions/group';
import { fetchFriends } from '../../actions/friend';

const title = 'Groups';

class Group extends Component {
  static propTypes = {
    friend: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    semester: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    fetchGroups: PropTypes.func.isRequired,
  }

  static contextTypes = {
    setTitle: PropTypes.func.isRequired,
  }

  state = {
    groupShown: null,
  }

  componentDidMount() {
    const { year, semester, isLoggedIn, group } = this.props;
    if (!group.isInitialized && isLoggedIn) {
      this.props.fetchGroups({ year, semester });
    }
  }

  handleGroupChange = (event, key, groupId) => {
    this.setState({
      groupShown: this.props.group.data.find(d => d.teamId === groupId),
    });
  }

  handleDateChange(event, date) {
    return { event, date };
  }

  render() {
    if (!this.props.isLoggedIn) {
      return (
        <div className={s.notLoggedInContainer}>
          <div className={s.logoContainer}>
            <img src="/facebook.png" alt="facebook logo" />
          </div>
          <div className={s.textContainer}>
            <span>Please </span>
            <Link to="/login">
              login
            </Link>
            <span> to compare your timetable!</span>
          </div>
        </div>
      );
    }
    this.context.setTitle(title);

    const noGroupContainer = (
      <div className={s.noGroupContainer}>
        <p>You do not have any groups. Create one!</p>
        <img src="/group.png" alt="group" />
      </div>
    );

    const selected = this.state.groupShown || this.props.group.data[0] || {};
    let timeshare = null;
    if (!this.props.group.isFetching && this.props.group.isInitialized) {
      if (this.props.group.data.length > 0) {
        timeshare = <TimeShareContainer group={selected} />;
      } else {
        timeshare = noGroupContainer;
      }
    }

    return (
      <div>
        <GroupToolbar
          groupShown={selected}
          groups={this.props.group.data}
          handleGroupChange={this.handleGroupChange}
          handleDateChange={this.handleDateChange}
        />
        {timeshare}
      </div>
    );
  }
}

const mapState = (state) => ({
  year: state.selection.year,
  semester: state.selection.semester,
  isLoggedIn: !!state.user.data.id,
  group: state.group,
  friend: state.friend,
});

const mapDispatch = {
  fetchGroups,
  fetchFriends,
};

export default connect(mapState, mapDispatch)(withStyles(s)(Group));
