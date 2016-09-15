import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import AutoComplete from 'material-ui/AutoComplete';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import ContentAddBox from 'material-ui/svg-icons/content/add-box';

import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import { List, ListItem } from 'material-ui/List';
import { lightGreen500 } from 'material-ui/styles/colors';

import ModuleListDialog from '../ModuleListDialog';

import s from './ModuleList.css';

class ModuleList extends Component {
  state = {
    isDialogOpen: false,
    selectedModule: {title: 'None'},
    dialogTitle: '',
    open: false,
    startIndex: 0,
  }

  handleOpen = (module) => {
    this.setState({ isDialogOpen: true, selectedModule: module });
  }

  handleClose = () => (this.setState({ isDialogOpen: false }))

  handleListButtonTouch = (module, e) => {
    e.stopPropagation();
    // TODO handle list button touch
  };

  handleAddToTimetable = (module) => {
      console.log('add to timetable ' + module.code);
  }

  handleUpdateInput = (value) => {
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ],
    });
  };

  next = () => {
    const { startIndex } = this.state;
    if (startIndex + 10 > this.props.modules.length) return;
    this.setState({startIndex: startIndex + 10})
  }

  prev = () => {
    const { startIndex } = this.state;
    if (startIndex - 10 < 0) return;
    this.setState({startIndex: startIndex - 10})
  }

  render() {
    const { dialogTitle, open, startIndex } = this.state;
    const { modules } = this.props;
    // Actions shown on the dialog
    const actions = [
      <FlatButton
        label="Add to Timetable"
        primary
        onTouchTap={this.handleClose}
      />,
    ];

    // Create the list of module cells
    const listItems = modules.slice(startIndex, startIndex + 10).map((module, i) => {
      return (
        <ListItem
          key={module.id}
          primaryText={module.code}
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
        <div style={{ position: 'fixed', zIndex: 10, left: '15px', right: '15px' }}>
          <AutoComplete
            hintText="Search for modules..."
            dataSource={modules.map(m => m.name)}
            onUpdateInput={this.handleUpdateInput}
            floatingLabelText="Module Search"
            fullWidth
          />
        </div>
        <div style={{ height: '70px' }} />
        <List>
          {listItems}
        </List>
        <div>
          <FlatButton
            icon={<ChevronLeft />}
            onTouchTap={this.prev}
            disabled={this.state.startIndex < 10}
          />
          <FlatButton
            icon={<ChevronRight />}
            onTouchTap={this.next}
            disabled={this.state.startIndex + 10 >= this.props.modules.length}
          />
        </div>
        <ModuleListDialog module={this.state.selectedModule} open={this.state.isDialogOpen} handleAddToTimetable={this.handleAddToTimetable} handleClose={this.handleClose}/>
      </div>
    );
  }
}

ModuleList.propTypes = {
  modules: PropTypes.array.isRequired,
};

export default withStyles(s)(ModuleList);
