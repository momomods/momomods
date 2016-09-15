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

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import IconButton from 'material-ui/IconButton';

import ContentAdd from 'material-ui/svg-icons/content/add';
import { lightGreen500 } from 'material-ui/styles/colors';

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

  handleChange() {
      console.log('changed to ' + this.state.groupShown);
  }

  render() {
    this.context.setTitle(title);

    const listItems = this.state.groups.map((group, i) => {
      return (
          <MenuItem key={i} value={i} primaryText={group.title} />
      );
    }, this);

    return (
      <div>
          <Toolbar className={s.groupToolbar}>
              <ToolbarGroup firstChild={true} className={s.groupToolbarGroup}>
                <DropDownMenu
                    className={s.groupToolbarDropdownMenu}
                    value={this.state.groupShown}
                    onChange={this.handleChange}
                    autoWidth={false}>
                    { listItems }
                </DropDownMenu>
                <IconButton className={s.groupToolbarButton}>
                  <ContentAdd onClick={this.props.handleGroupAdd} />
                </IconButton>
              </ToolbarGroup>
              <ToolbarSeparator />
              <ToolbarGroup lastChild={true} className={s.groupToolbarGroup}>
                  <div className={s.groupToolbarTitle}>Meet on </div>
                  <DatePicker
                      className={s.groupToolbarDatePicker}
                      hintText="Meeting Date"
                      autoOk={true}
                      defaultDate={this.state.dateToday}
                      formateDate={this.formatDate}
                  />
              </ToolbarGroup>
          </Toolbar>
          <div style={{ height: '70px' }} />
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
