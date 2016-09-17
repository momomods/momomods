import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import IconButton from 'material-ui/IconButton';

import GroupToolbarDialog from '../GroupToolbarDialog/GroupToolbarDialog';

import ContentAdd from 'material-ui/svg-icons/content/add';
import { lightGreen500 } from 'material-ui/styles/colors';

import s from './GroupToolbar.css';

const title = 'Groups';

class GroupToolbar extends Component {
    state = {
      isDialogOpen: false,
    }

    handleOpen = () => {
        this.setState({isDialogOpen: true});
    }

    handleClose = () => {
        this.setState({isDialogOpen: false});
    }

    handleGroupAdd = () =>  {

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
                        value={this.props.groupShown}
                        onChange={this.props.handleGroupChange}
                        autoWidth={false}>
                        { listItems }
                    </DropDownMenu>
                    <IconButton className={s.groupToolbarButton} onClick={this.handleOpen}>
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
                handleCreateGroup={this.handleGroupAdd}
                handleClose={this.handleClose}
              />
          </div>
        );
    }
}

export default withStyles(s)(GroupToolbar);
