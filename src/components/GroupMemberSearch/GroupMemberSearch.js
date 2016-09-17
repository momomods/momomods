import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import TextField from 'material-ui/TextField';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';

import s from './GroupMemberSearch.css';

/*
 * This is a TextField that shows selected friends and a Menu
 * with a list of friends that can be selected.
 *
 * Requires a param to indicate if dialog is open,
 * and handlers for tapping the close button, and create group button.
 */
class GroupMemberSearch extends Component {

  state = {
      selectedUsers: [],
      searchResults: [],
      searchTerm: '',
      isDropdownOpen: false,
  }

  styles = {
      chip: {
          margin: 4,
      },
      wrapper: {
          display: 'flex',
          flexWrap: 'wrap',
      },
  };

  openDropdown = (target) => {
      this.setState({
          isDropdownOpen: true,
          anchorEl: target,
      });
  }

  handleSearch = (event) => {
      this.openDropdown(event.target);
  }

  handleRequestClose = () => {
      console.log('close');
  }

  handleSelectUser = (user) => {
      this.state.selectedUsers.push(user);
      this.props.onChange(this.state.selectedUsers);
  }

  handleRemoveUser = (index) => {
      this.state.selectedUsers.splice(index, 1);
      this.props.onChange(this.state.selectedUsers);
  }

  render() {

    const selectedUserChips = this.state.selectedUsers.map((user, i) => (
        <Chip
          key={i}
          onRequestDelete={() => this.handleRemoveUser(i)}
          style={this.styles.chip}
        >
          {user.name}
        </Chip>
    ));

    const searchMenuItems = this.props.users.map((user) => (
      <MenuItem
        key={user.id}
        primaryText={user.name}
        rightIconButton={ <ContentAddBox color={lightGreen500} /> }
        onTouchTap={() => this.handleSelectUser(user)}
      />
    ));

    return (
        <div>
            <div>
                { selectedUserChips }
            </div>
            <TextField
              name="search"
              value={this.state.searchTerm}
              onChange={this.handleSearch}
            />
            <Popover
              open={this.state.isDropdownOpen}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.handleRequestClose}
            >
              <Menu>
                { searchMenuItems}
              </Menu>
            </Popover>
        </div>

    );
  }
}

GroupMemberSearch.propTypes = {
    users: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default withStyles(s)(GroupMemberSearch);
