import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

import GroupMemberSearch from '../GroupMemberSearch';
import { red500, grey50 } from 'material-ui/styles/colors';

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
      isDeleteDialogOpen: false,
      groupName: this.props.initialGroupName,
      groupMembers: this.props.initialSelectedUsers,
      users: [
          {
              userId: 1,
              name: 'Nicholette Li'
          },
          {
              userId: 2,
              name: 'Ng Zhi An'
          },
          {
              userId: 3,
              name: 'Patrick Cho'
          },
          {
              userId: 4,
              name: 'Michelle Tan'
          }
      ],
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
          groupName: nextProps.initialGroupName,
          groupMembers: nextProps.initialSelectedUsers
      });
  }

  handleDeleteDialogOpen = () => {
      this.setState({isDeleteDialogOpen: true});
  }

  handleDeleteDialogClose = () => {
      this.setState({isDeleteDialogOpen: false});
  }

  handleNameChange = (event) => {
      this.setState({groupName: event.target.value});
  }

  handleSelectedUsersChange = (users) => {
      this.setState({groupMembers: users});
  }

  isCreateMode = () => {
      return this.props.initialGroupName === '';
  }

  render() {
    const {
      handleCreateGroup,
      handleEditGroup,
      handleClose,
      open,
    } = this.props;

    const title = this.isCreateMode() ? 'Create Group' : 'Edit Group';

    const actions = [
      <FlatButton
        label="Close"
        onTouchTap={() => handleClose(module)}
      />,
    ];

    const deleteActions = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.handleDeleteDialogClose}
      />,
      <FlatButton
        label="Delete"
        secondary
        onTouchTap={this.props.handleDeleteGroup}
      />,
    ];

    // If dialog is in create mode
    if (this.isCreateMode()) {
        actions.push(
            <FlatButton
                label="Create"
                primary
                onTouchTap={() => handleCreateGroup(this.state.groupName, this.state.groupMembers)}
            />
        );
    } else {
        actions.push(
            <FlatButton
                label="Edit"
                primary
                onTouchTap={() => handleEditGroup(this.props.groupId, this.state.groupName, this.state.groupMembers)}
            />
        );
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
        <div className={s.inputContainer}>
            <p>Group Name</p>
            <TextField
              id="name"
              hintText="Group Name"
              value={this.state.groupName}
              onChange={this.handleNameChange}
              className={s.inputField}
            />
        </div>
        <div className={s.inputContainer}>
            <p>Group Members</p>
            <GroupMemberSearch
              initialSelectedUsers={this.props.initialSelectedUsers}
              users={this.state.users}
              onChange={this.handleSelectedUsersChange}
            />
        </div>
        {this.isCreateMode() ? '' :
        <div className={s.inputContainer}>
            <RaisedButton
                label="Delete Group"
                backgroundColor={red500}
                labelColor={grey50}
                onTouchTap={this.handleDeleteDialogOpen}
            />
            <Dialog
              title="Confirm Delete?"
              actions={deleteActions}
              modal={false}
              open={this.state.isDeleteDialogOpen}
              onRequestClose={this.handleDeleteDialogClose}
            >
              Are you sure you want to delete {this.state.groupName}?
            </Dialog>
        </div>
        }
      </Dialog>
    );
  }
}

GroupToolbarDialog.propTypes = {
  handleCreateGroup: PropTypes.func.isRequired,
  handleEditGroup: PropTypes.func.isRequired,
  handleDeleteGroup: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  initialGroupName: PropTypes.string,
  initialSelectedUsers: PropTypes.array
};

export default withStyles(s)(GroupToolbarDialog);
