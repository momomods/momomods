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

import s from './Timetable.css';
import { fetchTimetable } from '../../actions/timetable';
import TimetableComponent from '../../components/Timetable/Timetable';

const title = 'Timetable';

class Timetable extends Component {
  static propTypes = {
    data: PropTypes.object,
    isInitialized: PropTypes.bool.isRequired,
    fetchTimetable: PropTypes.func.isRequired,
  }

  static contextTypes = {
    setTitle: PropTypes.func.isRequired,
  }

  componentDidMount() {
    if (!this.props.isInitialized) this.props.fetchTimetable();
  }

  render() {
    this.context.setTitle(title);
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <TimetableComponent
            timetable={this.props.data}
          />
          <p>...</p>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  ...state.timetable,
});

const mapDispatch = (dispatch) => ({
  fetchTimetable: () => dispatch(fetchTimetable({})),
});

export default connect(mapState, mapDispatch)(withStyles(s)(Timetable));
