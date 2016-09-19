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
import TimetableContainer from '../../components/Timetable/TimetableContainer';

import s from './Group.css';
import { fetchGroups } from '../../actions/group';
import dummyState from './data';

const title = 'Groups';

class Group extends Component {
  static propTypes = {
    isInitialized: PropTypes.bool.isRequired,
    fetchGroups: PropTypes.func.isRequired,
  }

  static contextTypes = {
    setTitle: PropTypes.func.isRequired,
  }

  state = dummyState;

  componentDidMount() {
    if (!this.props.isInitialized) this.props.fetchGroups();
  }

  handleGroupChange = (event, key, groupId) => {
    this.setState({groupShown: this.state.groups[groupId]});
  }

  handleGroupAdd() {

  }

  handleDateChange(event, date) {
      console.log('date was changed ' + date);
  }

  render() {
    this.context.setTitle(title);

    const noGroupContainer = (
      <div className={s.noGroupContainer}>
        <p>You do not have any groups. Create one!</p>
        <img src="http://dl.dropbox.com/s/2fth5ceonfa3iww/group.png?dl=0"/>
      </div>
    );

    return (
      <div>
        <GroupToolbar
          groupShown={this.state.groupShown}
          groups={this.state.groups}
          handleGroupChange={this.handleGroupChange}
          handleGroupAdd={this.handleGroupAdd}
          handleDateChange={this.handleDateChange}
        />
        {this.state.groups.length > 0 ? <TimetableContainer /> : noGroupContainer }
      </div>
    );
  }
}

const mapState = (state) => ({
  ...state.group,
});

const mapDispatch = (dispatch) => ({
  fetchGroups: () => dispatch(fetchGroups({})),
});

export default connect(mapState, mapDispatch)(withStyles(s)(Group));
