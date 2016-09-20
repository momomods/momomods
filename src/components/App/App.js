/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import s from './App.css';
import Base from '../Base';

class App extends Component {

  static propTypes = {
    context: PropTypes.shape({
      createHref: PropTypes.func.isRequired,
      store: PropTypes.object.isRequired,
      insertCss: PropTypes.func,
      setTitle: PropTypes.func,
      setMeta: PropTypes.func,
    }).isRequired,
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  static childContextTypes = {
    createHref: PropTypes.func.isRequired,
    insertCss: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setMeta: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.getActiveTabFromPage = this.getActiveTabFromPage.bind(this);

    this.state = {
      activeTab: '',
      isSemesterOne: false,
    };
  }

  getChildContext() {
    const context = this.props.context;
    return {
      createHref: context.createHref,
      insertCss: context.insertCss || emptyFunction,
      setTitle: context.setTitle || emptyFunction,
      setMeta: context.setMeta || emptyFunction,
    };
  }

  componentWillMount() {
    const { insertCss } = this.props.context;
    this.removeCss = insertCss(s);
  }

  componentWillUnmount() {
    this.removeCss();
  }

  getActiveTabFromPage = (page) => {
    let activeTab = '';
    let displayName = null;
    if (page.type.ComposedComponent) {
      displayName = page.type.ComposedComponent.displayName;
    } else {
      displayName = page.type.displayName;
    }
    switch (displayName) {
      case 'TimetablePage':
        activeTab = 'Main';
        break;
      case 'Module':
        activeTab = 'Mods';
        break;
      case 'Group':
        activeTab = 'Meet';
        break;
      default:
        activeTab = '';
    }

    return activeTab;
  }

  handleSwitchSemester = () => {
      this.setState({isSemesterOne: !this.state.isSemesterOne});
  }

  render() {
    if (this.props.error) {
      return this.props.children;
    }

    const store = this.props.context.store;
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <Base
            activeTab={this.getActiveTabFromPage(this.props.children)}
            isSemesterOne={this.state.isSemesterOne}
            handleSwitchSemester={this.handleSwitchSemester}
          >
            {this.props.children}
          </Base>
        </MuiThemeProvider>
      </Provider>
    );
  }

}

export default App;
