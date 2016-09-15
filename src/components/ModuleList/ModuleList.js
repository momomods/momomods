import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

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
    selectedModule: {},
    startIndex: 0,
  }

  handleOpen = (module) => {
    this.setState({ isDialogOpen: true, selectedModule: module });
  }

  handleClose = () => (this.setState({ isDialogOpen: false }))

  handleListButtonTouch = (module, e) => {
    this.props.addModule(module);
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
    this.setState({ startIndex: startIndex + 10 });
  }

  prev = () => {
    const { startIndex } = this.state;
    if (startIndex - 10 < 0) return;
    this.setState({ startIndex: startIndex - 10 });
  }

  render() {
    const { isDialogOpen, selectedModule, startIndex } = this.state;
    const { modules } = this.props;

    // Create the list of module cells
    const listItems = modules.slice(startIndex, startIndex + 10).map((module) => (
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
    ));

    return (
      <div>
        <List>
          {listItems}
        </List>
        <div>
          <FlatButton
            icon={<ChevronLeft />}
            onTouchTap={this.prev}
            disabled={startIndex < 10}
          />
          <FlatButton
            icon={<ChevronRight />}
            onTouchTap={this.next}
            disabled={startIndex + 10 >= this.props.modules.length}
          />
        </div>
        <ModuleListDialog
          module={selectedModule}
          open={isDialogOpen}
          handleAddToTimetable={this.handleAddToTimetable}
          handleClose={this.handleClose}
        />
      </div>
    );
  }
}

ModuleList.propTypes = {
  modules: PropTypes.array.isRequired,
  addModule: PropTypes.func.isRequired,
};

export default withStyles(s)(ModuleList);
