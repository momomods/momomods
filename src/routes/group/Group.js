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
  }

  static contextTypes = {
    setTitle: PropTypes.func.isRequired,
  }

  state = {
    groupShown: null
  }

  componentDidMount() {
    const { year, semester, isLoggedIn, group, friend } = this.props;
    if (!group.isInitialized && isLoggedIn) {
      this.props.fetchGroups({ year, semester });
    }
  }

  handleGroupChange = (event, key, groupId) => {
    this.setState({
      groupShown: this.props.group.data.find(d => d.teamId === groupId)
    });
  }

  handleDateChange(event, date) {
    console.log('date was changed ' + date);
  }

  render() {
    if (!this.props.isLoggedIn) {
      return (
        <div className={s.notLoggedInContainer}>
            <div className={s.logoContainer}>
                <img src="/facebook.png" />
            </div>
            <div className={s.textContainer}>Please login to compare your timetable!</div>
        </div>
      )
    }
    this.context.setTitle(title);

    const noGroupContainer = (
      <div className={s.noGroupContainer}>
        <p>You do not have any groups. Create one!</p>
        <img src="/group.png"/>
      </div>
    );
    
    const selected = this.state.groupShown || this.props.group.data[0];
    console.log("selected", selected, selected.teamId);

    return (
      <div>
        <GroupToolbar
          groupShown={selected}
          groups={this.props.group.data}
          handleGroupChange={this.handleGroupChange}
          handleDateChange={this.handleDateChange}
        />
        {this.props.group.isFetching || !this.props.group.isInitialized ? null : (
          this.props.group.data.length > 0 ?
          <TimeShareContainer group={selected} /> :
          noGroupContainer
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    year: state.selection.year,
    semester: state.selection.semester,
    isLoggedIn: !!state.user.data.id,
    group: state.group,
    friend: state.friend,
  }
}

const mapDispatch = (dispatch) => ({
  fetchGroups,
  fetchFriends,
});

export default connect(mapState, mapDispatch)(withStyles(s)(Group));
