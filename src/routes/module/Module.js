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

import ModuleList from '../../components/ModuleList/ModuleList';

import s from './Module.css';
import { fetchModules } from '../../actions/module';

const title = 'Modules';

class Module extends Component {
  static propTypes = {
    isInitialized: PropTypes.bool.isRequired,
    fetchModules: PropTypes.func.isRequired,
  }

  static contextTypes = {
    setTitle: PropTypes.func.isRequired,
  }

  state = {
    modules: [
      {
        code: 'CS101',
        name: 'Programming Something'
      },
      {
        code: 'CS101',
        name: 'Programming Something'
      },
      {
        code: 'CS101',
        name: 'Programming Something'
      },
      {
        code: 'CS101',
        name: 'Programming Something'
      },
      {
        code: 'CS101',
        name: 'Programming Something'
      },
      {
        code: 'CS101',
        name: 'Programming Something'
      },
      {
        code: 'CS101',
        name: 'Programming Something'
      },
      {
        code: 'CS101',
        name: 'Programming Something'
      },
      {
        code: 'CS101',
        name: 'Programming Something'
      },
      {
        code: 'CS101',
        name: 'Programming Something'
      },
      {
        code: 'CS101',
        name: 'Programming Something'
      },
      {
        code: 'CS101',
        name: 'Programming Something'
      }
    ]
  }

  componentDidMount() {
    if (!this.props.isInitialized) this.props.fetchModules();
  }

  render() {
    this.context.setTitle(title);

    return (
      <ModuleList modules={this.state.modules}/>
    );
  }
}

const mapState = (state) => ({
  ...state.module,
});

const mapDispatch = (dispatch) => ({
  fetchModules: () => dispatch(fetchModules({})),
});

export default connect(mapState, mapDispatch)(withStyles(s)(Module));
