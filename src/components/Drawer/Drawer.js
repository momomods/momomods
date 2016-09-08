import Drawer from 'react-mdl/lib/Layout/Drawer';
import Navigation from 'react-mdl/lib/Layout/Navigation';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Link from '../Link';

class AppDrawer extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    email: PropTypes.string,
  }

  render() {
    const { loggedIn, email } = this.props;
    const title = loggedIn ? email : 'MoMoMods';

    return (
      <Drawer title={title}>
          <Navigation>
            <Link to="/timetable">Timetable</Link>
            <Link to="/module">Modules</Link>
            <Link to="/group">Groups</Link>
            {loggedIn ?
              null
              :
              <Link to="/login">Log in</Link>
            }
            {loggedIn ?
              null
              :
              <Link to="/register">Sign up</Link>
            }
          </Navigation>
      </Drawer>
    );
  }
}

const mapState = (state) => {
  return {
    loggedIn: !!state.user.id,
    email: state.user.email,
  }
};

export default connect(mapState)(AppDrawer);
