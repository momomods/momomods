import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { logUserOut } from '../../actions/user';
import { navigate } from '../../actions/route';

class Logout extends Component {
  componentDidMount() {
    this.props.logUserOut();
    this.props.navigate('/');
  }

  render() {
    return null;
  }
}

Logout.propTypes = {
  logUserOut: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default connect(null, { navigate, logUserOut })(Logout);
