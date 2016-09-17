import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

import GroupMemberSearch from '../GroupMemberSearch';

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
              id: 1,
              name: 'Nicholette Li'
          },
          {
              id: 2,
              name: 'Ng Zhi An'
          },
          {
              id: 3,
              name: 'Patrick Cho'
          },
          {
              id: 4,
              name: 'Michelle Tan'
          }
      ],
  }

  handleNameChange = (event) => {
      this.setState({groupName: event.target.value});
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
            <h5>Group Name</h5>
            <TextField
              id="name"
              hintText="Group Name"
              value={this.state.groupName}
              onChange={this.handleNameChange}
            />
            <Divider />
            <h5>Group Members</h5>
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
