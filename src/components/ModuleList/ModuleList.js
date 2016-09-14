import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import {List, ListItem} from 'material-ui/List';
import {lightGreen500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import ContentAddBox from 'material-ui/svg-icons/content/add-box';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import AutoComplete from 'material-ui/AutoComplete';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import s from './ModuleList.css';

class ModuleList extends Component {
  state = {
    open: false,
  }

  handleOpen = (module) => {
    var title = module.code + ' ' + module.name;
    this.setState({open: true, dialogTitle: title});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleListButtonTouch = (module, e) => {
    e.stopPropagation();
    // TODO handle list button touch
  };

  handleUpdateInput = (value) => {
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ],
    });
  };

  render() {
    // Actions shown on the dialog
    const actions = [
      <FlatButton
      label="Add to Timetable"
      primary={true}
      onTouchTap={this.handleClose}
      />,
    ];

    // Create the list of module cells
    var listItems = this.props.modules.map(function(module, i) {
      return (
          <ListItem
          key={i}
          primaryText={module.code + i}
          secondaryText={module.name}
          rightIconButton={
              <IconButton onClick={(e) => this.handleListButtonTouch(module, e)}>
                  <ContentAddBox color={lightGreen500} />
              </IconButton>
          }
          onClick={() => this.handleOpen(module)}
          />
      );
    }, this);

    return (
        <div>
            <div style={{position: 'fixed', 'zIndex': 10, left: '15px', right: '15px'}}>
                <AutoComplete
                  hintText="Search for modules..."
                  dataSource={this.props.modules}
                  onUpdateInput={this.handleUpdateInput}
                  floatingLabelText="Module Search"
                  fullWidth={true}
                />
            </div>
            <div style={{height: '70px'}}></div>
            <List style={{position: 'fixed', width: '100%', height: '80%', overflow: 'scroll'}}>
                {listItems}
            </List>
            <Dialog
              title={this.state.dialogTitle}
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              autoScrollBodyContent={true}
            >
                <div>Dont panic, the module codes shown in the list are combined with their key but the dialog just gets the module code only.</div>
            </Dialog>
        </div>
    );
  }
}

export default withStyles(s)(ModuleList);
