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

const title = 'Groups';

class Group extends Component {
  static propTypes = {
    isInitialized: PropTypes.bool.isRequired,
    fetchGroups: PropTypes.func.isRequired,
  }

  static contextTypes = {
    setTitle: PropTypes.func.isRequired,
  }

  constructor(props) {
      super(props);

      this.handleGroupChange = this.handleGroupChange.bind(this);

      this.state = {
          groupShown: 0,
          groups: [{
              title: 'CS3216 Group 1'
          },
          {
              title: 'CS3216 Group 2'
          },
          {
              title: 'CS3216 Group 3'
          },
          {
              title: 'CS3216 Group 4'
          }],
          dateToday: new Date(),
      };
  }

  componentDidMount() {
    if (!this.props.isInitialized) this.props.fetchGroups();
  }

  handleGroupChange(event, key, value) {
      console.log('changed to ' + value);
      this.setState({groupShown: value});
  }

  handleGroupAdd() {

  }

  handleDateChange(event, date) {
      console.log('date was changed ' + date);
  }

  render() {
    this.context.setTitle(title);

    return (
      <div>
          <GroupToolbar
            groupShown={this.state.groupShown}
            groups={this.state.groups}
            handleGroupChange={this.handleGroupChange}
            handleGroupAdd={this.handleGroupAdd}
            handleDateChange={this.handleDateChange}
          />
          <TimetableContainer />
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
