import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import Navigation from '../Navigation';

import s from './Header.css';

class Header extends Component {
  render() {
    return (
      <div>
        <div style={{ position: 'fixed', width: '100%', zIndex: 10 }}>
          <AppBar
            title="mods+"
            showMenuIconButton={false}
            iconElementRight={<FlatButton label="Login" />}
            zDepth={0}
          />
          <Navigation />
        </div>
        <div style={{ height: '112px', width: '100%' }} />
      </div>
    );
  }
}

export default withStyles(s)(Header);
