import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { logUserOut } from '../../actions/user'
import { navigate } from '../../actions/route';

const title = 'Log In';

class Logout extends Component {
  componentDidMount() {
    console.log('log user out');
    this.props.navigate('/');
  }

  render() {
    this.context.setTitle(title);
    return (
      <div className={s.root}>
      logging user out
      </div>
    );
  }
}

Logout.contextTypes = { setTitle: PropTypes.func.isRequired };

export default connect(null, { navigate })(Logout);
