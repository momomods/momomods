import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import AppBar from 'material-ui/AppBar';

import s from './Header.css';

class Header extends Component {
  render() {
    return (
      <div>
        <AppBar title="mods+" iconClassNameRight="muidocs-icon-navigation-expand-more" />
      </div>
    );
  }
}

export default withStyles(s)(Header);
