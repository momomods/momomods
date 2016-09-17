import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import IconButton from 'material-ui/IconButton';

import GroupToolbarDialog from '../GroupToolbarDialog/GroupToolbarDialog';

import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { lightGreen500 } from 'material-ui/styles/colors';

import s from './GroupToolbar.css';

const title = 'Groups';

class GroupToolbar extends Component {
    state = {
      isDialogOpen: false,
      groupName: '',
      groupMembers: [],
    }

    handleTouchCreate = () => {
        this.setState({
            isDialogOpen: true,
            groupName: '',
            groupMembers: []
        });
    }

    handleClose = () => {
        this.setState({isDialogOpen: false});
    }

    handleTouchEdit = () => {
        this.setState({
            isDialogOpen: true,
            groupName: this.props.groupShown.title,
            groupMembers: this.props.groupShown.members
        });
        console.log(this.state.groupMembers);
    }

    handleCreateGroup = (name, members) =>  {
        console.log('create group ' + name);
        console.log(name);
        console.log(members);
        // TODO dispatch to create group?
    }

    handleEditGroup = (name, members) => {
        console.log('edit group ' + this.props.groupShown.title);
        console.log(name);
        console.log(members);
        // TODO dispatch to edit group?
    }

    render() {

        const listItems = this.props.groups.map((group, i) => {
          return (
              <MenuItem key={i} value={i} primaryText={group.title} />
          );
        }, this);

        return (
          <div>
              <Toolbar className={s.groupToolbar}>
                  <ToolbarGroup firstChild={true} className={s.groupToolbarGroup}>
                    <DropDownMenu
                        className={s.groupToolbarDropdownMenu}
                        value={this.props.groupShown.id}
                        onChange={this.props.handleGroupChange}
                        autoWidth={false}>
                        { listItems }
                    </DropDownMenu>
                    <IconButton className={s.groupToolbarButton} onClick={this.handleTouchEdit}>
                        <EditorModeEdit />
                    </IconButton>
                    <IconButton className={s.groupToolbarButton} onClick={this.handleTouchCreate}>
                        <ContentAdd />
                    </IconButton>
                  </ToolbarGroup>
                  <ToolbarSeparator />
                  <ToolbarGroup lastChild={true} className={s.groupToolbarGroup}>
                      <DatePicker
                          className={s.groupToolbarDatePicker}
                          hintText="Meeting Date"
                          autoOk={true}
                          defaultDate={this.props.dateToday}
                          onChange={this.props.handleDateChange}
                      />
                  </ToolbarGroup>
                </Toolbar>
              <div style={{ height: '56px' }} />
              <GroupToolbarDialog
                open={this.state.isDialogOpen}
                handleCreateGroup={this.handleCreateGroup}
                handleEditGroup={this.handleEditGroup}
                handleClose={this.handleClose}
                initialGroupName={this.state.groupName}
                initialSelectedUsers={this.state.groupMembers}
              />
          </div>
        );
    }
}

export default withStyles(s)(GroupToolbar);
