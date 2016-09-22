import React, { Component, PropTypes } from 'react';

import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';

/*
 * This is a TextField that shows selected friends and a Menu
 * with a list of friends that can be selected.
 *
 * Requires an array of users and an onChange handler for
 * selectedUsers.
 */
class GroupMemberSearch extends Component {

  state = {
    searchText: '',
    dataSource: [],
    selectedUsers: this.props.initialSelectedUsers || [],
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

  notSelected = (user) => (
    !this.state.selectedUsers.find(u => u.userId === user.id))

  nameMatches = (searchText, user) => (
    user.name.toLowerCase().includes(searchText.toLowerCase()))

  handleUpdateDataSource = (searchText) => {
    const filteredSource = this.props.users.filter(u => (
      this.notSelected(u) && this.nameMatches(searchText, u)));

    this.setState({
      searchText,
      dataSource: filteredSource,
    });
  }

  handleSelectUser = (request, index) => {
    var selectedUser;
    if (index === -1 && this.state.dataSource.length > 0) {
      // hit enter in text field
      selectedUser = this.state.dataSource[0];

    } else if (index >= 0) {
      // click on list item
      selectedUser = this.state.dataSource[index];
    }

    // Set flag on selectedUser
    selectedUser.isNew = true;
    this.state.selectedUsers.push(selectedUser);
    this.setState({ searchText: '' });
    this.props.onChange(this.state.selectedUsers);
  }

  handleRemoveUser = (index) => {
    this.state.selectedUsers.splice(index, 1);

    this.props.onChange(this.state.selectedUsers);
  }

  render() {
    const dataSourceConfig = {
      text: 'name',
      value: 'id',
    };

    const selectedUserChips = this.state.selectedUsers.map(function(user, i) {
        // Only allow delete if user is newly added
        if (user.isNew) {
            return (
                <Chip
                  key={i}
                  onRequestDelete={() => this.handleRemoveUser(i)}
                  style={this.styles.chip}
                >
                  {user.name}
                </Chip>
            );
        } else {
            return (
                <Chip
                  key={i}
                  style={this.styles.chip}
                >
                  {user.name}
                </Chip>
            );
        }
    }, this);

    return (
      <div>
        <div style={this.styles.wrapper}>
          { selectedUserChips }
        </div>
        <AutoComplete
          filter={AutoComplete.noFilter}
          hintText="Find your friend..."
          searchText={this.state.searchText}
          dataSource={this.state.dataSource}
          onNewRequest={this.handleSelectUser}
          onUpdateInput={this.handleUpdateDataSource}
          floatingLabelText="Add friends"
          fullWidth
          dataSourceConfig={dataSourceConfig}
          openOnFocus
        />
      </div>
    );
  }
}

GroupMemberSearch.propTypes = {
  initialSelectedUsers: PropTypes.array,
  users: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default GroupMemberSearch;
