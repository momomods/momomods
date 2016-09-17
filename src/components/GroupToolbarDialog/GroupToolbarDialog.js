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
      groupName: this.props.initialGroupName,
      groupMembers: this.props.initialSelectedUsers,
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

  componentWillReceiveProps(nextProps) {
      this.setState({
          groupName: nextProps.initialGroupName,
          groupMembers: nextProps.initialSelectedUsers
      });
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

    // If dialog is in create mode
    if (this.isCreateMode()) {
      actions.push(
        <FlatButton
          label="Create"
          primary
          onTouchTap={() => handleCreateGroup(this.state.groupName, this.state.groupMembers)}
        />);
    } else {
        actions.push(
          <FlatButton
            label="Edit"
            primary
            onTouchTap={() => handleEditGroup(this.state.groupName, this.state.groupMembers)}
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
      </Dialog>
    );
  }
}

GroupToolbarDialog.propTypes = {
  handleCreateGroup: PropTypes.func.isRequired,
  handleEditGroup: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  initialGroupName: PropTypes.string,
  initialSelectedUsers: PropTypes.array
};

export default withStyles(s)(GroupToolbarDialog);
