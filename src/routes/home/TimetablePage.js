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

import s from './TimetablePage.css';
import TimetableContainer from '../../components/Timetable/TimetableContainer';

const title = 'Timetable';

class TimetablePage extends Component {
  static contextTypes = {
    setTitle: PropTypes.func.isRequired,
  }

  render() {
    this.context.setTitle(title);
    return (
      <div>
        <div className={s.container}>
          <TimetableContainer />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(TimetablePage);
