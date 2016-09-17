import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';

import s from './GroupMemberSearch.css';

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
      selectedUsers: this.props.initialSelectedUsers ?
                     this.props.initialSelectedUsers : [],
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

  handleUpdateDataSource = (searchText) => {
      var filteredSource = [];
      this.props.users.map(function(user) {
          // Return users not selected and with name matching searchText
          if (this.state.selectedUsers.indexOf(user) < 0 &&
              user.name.toUpperCase().includes(searchText.toUpperCase())) {
              filteredSource.push(user.name);
          }
      }, this);

      this.setState({
          searchText: searchText,
          dataSource: filteredSource,
      });
  }

  handleSelectUser = (request, index) => {
      // When user selects a list item
      if (index > -1) {
          this.state.selectedUsers.push(this.props.users[index]);
          this.setState({searchText: ''});
          console.log(this.state.searchText);

          this.props.onChange(this.state.selectedUsers);
      }
  }

  handleRemoveUser = (index) => {
      this.state.selectedUsers.splice(index, 1);

      this.props.onChange(this.state.selectedUsers);
  }

  render() {
      console.log(this.props.initialSelectedUsers);

    const selectedUserChips = this.state.selectedUsers.map((user, i) => (
        <Chip
          key={i}
          onRequestDelete={() => this.handleRemoveUser(i)}
          style={this.styles.chip}
        >
          {user.name}
        </Chip>
    ));

    return (
        <div>
            <div style={this.styles.wrapper}>
                { selectedUserChips }
            </div>
            <AutoComplete
              hintText="Find your friend..."
              searchText={this.state.searchText}
              dataSource={this.state.dataSource}
              onNewRequest={this.handleSelectUser}
              onUpdateInput={this.handleUpdateDataSource}
              floatingLabelText="Find friends"
              fullWidth={true}
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

export default withStyles(s)(GroupMemberSearch);
