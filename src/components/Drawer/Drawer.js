import Drawer from 'react-mdl/lib/Layout/Drawer';
import Navigation from 'react-mdl/lib/Layout/Navigation';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Link from '../Link';

const AppDrawer = ({ loggedIn, email }) => {
  const title = loggedIn ? email : 'mods+';

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
};

AppDrawer.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  email: PropTypes.string,
};

const mapState = (state) => ({
  loggedIn: !!state.user.data.id,
  email: state.user.data.email,
});

export default connect(mapState)(AppDrawer);
