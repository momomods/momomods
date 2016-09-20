import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import IconButton from 'material-ui/IconButton';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { lightGreen500 } from 'material-ui/styles/colors';

import GroupToolbarDialog from '../GroupToolbarDialog/GroupToolbarDialog';
import s from './GroupToolbar.css';
import { createGroup, fetchGroups, updateGroup } from '../../actions/group';

const title = 'Groups';

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

  handleClose = () => this.setState({isDialogOpen: false})

  handleCreateGroup = (name, members) =>  {
    this.props.createGroup({
      year: this.props.year,
      semester: this.props.semester,
      name,
      members,
    })
    this.setState({ isDialogOpen: false });
  }

  handleEditGroup = (id, name, members) => {
    this.props.updateGroup({ id, name, members });
    this.setState({ isDialogOpen: false });
    // lazy to create a new reducer, let's just fetch again
    const { year, semester } = this.props;
    this.props.fetchGroups({ year, semester });
  }

  handleDeleteGroup = () => {
      this.handleClose();

      console.log('delete group ' + this.props.groupShown.teamName);
      // TODO dispatch to delete group?
  }

  render() {
    const {
      groups,
      handleGroupChange,
      dateToday,
      handleDateChange,
      groupShown,
    } = this.props;

    const groupId = (groupShown && groupShown.teamId) || null;
    const groupName = (groupShown && groupShown.teamName) || null;
    const groupMembers = (groupShown && groupShown.members) || [];

    const listItems = groups.map((group, i) => (
      <MenuItem key={group.teamId} value={group.teamId} primaryText={group.teamName} />
    ));
    const isGroupSelected = (typeof groupId !== 'undefined');

    return (
      <div>
        <Toolbar className={s.groupToolbar}>
          <ToolbarGroup firstChild={true} className={s.groupToolbarGroup}>
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
              disabled={!isGroupSelected}>
              <EditorModeEdit />
            </IconButton>
            <IconButton
              className={s.groupToolbarButton}
              onClick={this.handleTouchCreate}>
              <ContentAdd />
            </IconButton>
          </ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarGroup lastChild={true} className={s.groupToolbarGroup}>
            <DatePicker
              className={s.groupToolbarDatePicker}
              hintText="Meeting Date"
              autoOk={true}
              defaultDate={dateToday}
              onChange={handleDateChange}
              disabled={!isGroupSelected}
            />
          </ToolbarGroup>
        </Toolbar>
        <div style={{ height: '56px' }} />
        <GroupToolbarDialog
          open={this.state.isDialogOpen}
          handleCreateGroup={this.handleCreateGroup.bind(this)}
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
  fetchGroups: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  year: state.selection.year,
  semester: state.selection.semester,
});

const mapDispatch = {
  createGroup,
  fetchGroups,
  updateGroup,
};

export default connect(mapState, mapDispatch)(withStyles(s)(GroupToolbar));
