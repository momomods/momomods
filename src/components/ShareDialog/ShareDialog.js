import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import s from './ShareDialog.css';

class ShareDialog extends Component {
    render() {

        const actions = [
          <FlatButton
            label="Close"
            primary={true}
            onTouchTap={this.props.handleClose}
          />,
        ];

        return (
            <Dialog
              title="Share Free Times"
              actions={actions}
              modal={false}
              open={this.props.open}
              onRequestClose={this.props.handleClose}
              autoScrollBodyContent={true}>
                <div>
                    {this.props.text}
                </div>
            </Dialog>
        );
    }
}

ShareDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default withStyles(s)(ShareDialog);
