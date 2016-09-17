import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import GroupMemberSearch from '../GroupMemberSearch';

import ContentAdd from 'material-ui/svg-icons/content/add';
import { lightGreen500 } from 'material-ui/styles/colors';

import s from './GroupToolbarDialog.css';

/*
 * This is a Dialog that shows a form for creating a group.
 *
 * Requires a param to indicate if dialog is open,
 * and handlers for tapping the close button, and create group button.
 */
class GroupToolbarDialog extends Component {
  displayName = 'GroupToolbarDialog'

  state = {
      groupName: '',
      groupMembers: [],
      users: [
          {
              name: 'Nicholette Li'
          },
          {
              name: 'Nicholette Li'
          },
          {
              name: 'Nicholette Li'
          },
          {
              name: 'Nicholette Li'
          }
      ],
  }

  handleSelectedUsersChange = (users) => {
      console.log(users);
      this.setState({groupMembers: users});
  }

  render() {
    const {
      handleCreateGroup,
      handleClose,
      open,
    } = this.props;

    const title = `Create Group`;

    const actions = [
      <FlatButton
        label="Close"
        onTouchTap={() => handleClose(module)}
      />,
    ];

    if (handleCreateGroup) {
      actions.push(
        <FlatButton
          label="Create"
          primary
          onTouchTap={() => handleCreateGroup(this.state.groupName, this.state.groupMembers)}
        />);
    }

    return (
      <Dialog
        title={title}
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={handleClose}
        autoScrollBodyContent
      >
        <div>
            <h3>Group Name</h3>
            <TextField
              name="name"
              value={this.state.groupName}
            />
            <br />
            <h3>Group Members</h3>
            <GroupMemberSearch
              users={this.state.users}
              onChange={this.handleSelectedUsersChange}
            />
        </div>
      </Dialog>
    );
  }
}

GroupToolbarDialog.propTypes = {
  handleCreateGroup: PropTypes.func,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default withStyles(s)(GroupToolbarDialog);
