import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { logUserOut } from '../../actions/user'
import { navigate } from '../../actions/route';

const title = 'Log In';

class Logout extends Component {
  componentDidMount() {
    this.props.logUserOut()
    this.props.navigate('/');
  }

  render() {
    return null;
  }
}

Logout.contextTypes = { setTitle: PropTypes.func.isRequired };

export default connect(null, { navigate, logUserOut })(Logout);
