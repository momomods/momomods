import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import IconButton from 'material-ui/IconButton';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ContentAdd from 'material-ui/svg-icons/content/add';

import GroupToolbarDialog from '../GroupToolbarDialog/GroupToolbarDialog';
import s from './GroupToolbar.css';
import { createGroup, deleteGroup, updateGroup } from '../../actions/group';

class GroupToolbar extends Component {
  state = {
    isDialogOpen: false,
    initialGroupName: '',
    initialGroupMembers: [],
  }

  handleTouchCreate = () => this.setState({
    isDialogOpen: true,
    initialGroupName: '',
    initialGroupMembers: [],
  });

  handleTouchEdit = () => this.setState({
    isDialogOpen: true,
    initialGroupName: this.props.groupShown.teamName,
    initialGroupMembers: this.props.groupShown.members,
  })

  handleClose = () => this.setState({ isDialogOpen: false })

  handleCreateGroup = (name, members) => {
    this.props.createGroup({
      year: this.props.year,
      semester: this.props.semester,
      name,
      members,
    });
    this.setState({ isDialogOpen: false });
  }

  handleEditGroup = (id, name, members) => {
    this.props.updateGroup({ id, name, members });
    this.setState({ isDialogOpen: false });
  }

  handleDeleteGroup = ({ id }) => {
    this.props.deleteGroup({ id });
    this.handleClose();
  }

  render() {
    const {
      groups,
      handleGroupChange,
      handleDateChange,
      groupShown,
      friend,
      year,
      semester,
    } = this.props;

    const groupId = (groupShown && groupShown.teamId) || null;

    const listItems = groups.map(group => (
      <MenuItem key={group.teamId} value={group.teamId} primaryText={group.teamName} />
    ));
    const isGroupSelected = (typeof groupId !== 'undefined' && groupId !== null);

    const users = (
      friend.data[year] &&
      friend.data[year][semester]) || [];

    const minDate = new Date();
    minDate.setHours(0, 0, 0, 0);

    return (
      <div>
        <Toolbar className={s.groupToolbar}>
          <ToolbarGroup firstChild className={s.groupToolbarGroup}>
            <DropDownMenu
              className={s.groupToolbarDropdownMenu}
              value={groupId}
              onChange={handleGroupChange}
              autoWidth={false}
              disabled={!isGroupSelected}
            >
              { listItems }
            </DropDownMenu>
            <IconButton
              className={s.groupToolbarButton}
              onClick={this.handleTouchEdit}
              disabled={!isGroupSelected}
            >
              <EditorModeEdit />
            </IconButton>
            <IconButton
              className={s.groupToolbarButton}
              onClick={this.handleTouchCreate}
            >
              <ContentAdd />
            </IconButton>
          </ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarGroup lastChild className={s.groupToolbarGroup}>
            <DatePicker
              className={s.groupToolbarDatePicker}
              hintText="Meeting Date"
              autoOk
              defaultDate={new Date()}
              onChange={handleDateChange}
              disabled={!isGroupSelected}
              minDate={minDate}
            />
          </ToolbarGroup>
        </Toolbar>
        <div style={{ height: '56px' }} />
        <GroupToolbarDialog
          users={users}
          open={this.state.isDialogOpen}
          handleCreateGroup={this.handleCreateGroup}
          handleEditGroup={this.handleEditGroup}
          handleDeleteGroup={this.handleDeleteGroup}
          handleClose={this.handleClose}
          groupId={groupId}
          initialGroupName={this.state.initialGroupName}
          initialSelectedUsers={this.state.initialGroupMembers}
        />
      </div>
    );
  }
}

GroupToolbar.propTypes = {
  groupShown: PropTypes.object,
  groups: PropTypes.array,
  handleGroupChange: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  year: PropTypes.string.isRequired,
  semester: PropTypes.string.isRequired,
  friend: PropTypes.object.isRequired,
  updateGroup: PropTypes.func.isRequired,
  createGroup: PropTypes.func.isRequired,
  deleteGroup: PropTypes.func.isRequired,
  groupName: PropTypes.string,
  groupMembers: PropTypes.array,
};

const mapState = (state) => ({
  year: state.selection.year,
  semester: state.selection.semester,
  friend: state.friend,
});

const mapDispatch = {
  createGroup,
  deleteGroup,
  updateGroup,
};

export default connect(mapState, mapDispatch)(withStyles(s)(GroupToolbar));
