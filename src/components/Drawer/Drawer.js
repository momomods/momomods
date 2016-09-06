import Drawer from 'react-mdl/lib/Layout/Drawer';
import Navigation from 'react-mdl/lib/Layout/Navigation';
import React, { Component, PropTypes } from 'react';
import Link from '../Link';
import { connect } from 'react-redux';

class AppDrawer extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
  }

  render() {
    const { loggedIn, email } = this.props;
    const title = loggedIn ? email : 'MoMoMods';

    return (
      <Drawer title={title}>
          <Navigation>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
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
    )
  }
}

const mapState = (state) => {
  return {
    loggedIn: !!state.user.id,
    email: state.user.email,
  }
};

export default connect(mapState)(AppDrawer);
