import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import Navigation from '../Navigation';
import Link from '../Link';
import { navigate } from '../../actions/route';

import s from './Header.css';

class Header extends Component {
  render() {
    const loginButton = (
      <FlatButton
        label="Login"
        onTouchTap={() => this.props.navigate("/login")}
      />
    )
    return (
      <div>
        <div style={{ position: 'fixed', width: '100%', zIndex: 10 }}>
          <AppBar
            title="mods+"
            showMenuIconButton={false}
            iconElementRight={loginButton}
            zDepth={0}
          />
          <Navigation activeTab={this.props.activeTab || "mods+"} />
        </div>
        <div style={{ height: '112px', width: '100%' }} />
      </div>
    );
  }
}

Header.propTypes = {
  activeTab: PropTypes.string.isRequired,
}

export default connect(null, { navigate })(withStyles(s)(Header));
