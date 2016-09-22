import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import s from './ShareDialog.css';

class ShareDialog extends Component {

  state = {
    isSnackbarOpen: false,
  }

  handleRequestClose = () => {
    this.setState({ isSnackbarOpen: false });
  }

  handleCopy = () => {
    const copyTextarea = document.querySelector('#copytextarea');
    copyTextarea.select();

    try {
      document.execCommand('copy');
      // If successful, show notif and close dialog
      this.setState({ isSnackbarOpen: true });
      this.props.handleClose();
    } catch (err) {
      this.setState({ isSnackbarOpen: false });
      this.props.handleClose();
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary
        onTouchTap={this.props.handleClose}
      />,
    ];

    const waLink = `whatsapp://send?text=${this.props.text}`;

    return (
      <div>
        <Dialog
          title="Share Free Times"
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.props.handleClose}
        >
          <textarea className={s.copyTextArea} id="copytextarea">
            {this.props.text}
          </textarea>
          <br />
          <RaisedButton label="Copy to Clipboard" onClick={this.handleCopy} primary />
          <br />
          <div className={s.whatsappBtnContainer}>
            <div className={s.whatsappBtnInnerContainer}>
              <div className={s.whatsappBtnHighlight}>
                  <a href={waLink} data-action="share/whatsapp/share" className={s.whatsappBtn}>
                    Share via Whatsapp
                  </a>
              </div>
            </div>
          </div>
        </Dialog>
        <Snackbar
          open={this.state.isSnackbarOpen}
          message="Copied to clipboard"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

ShareDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default withStyles(s)(ShareDialog);
