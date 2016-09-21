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

  componentWillReceiveProps = () => {
    // when we receive new modules, reset the start index to 0 to show page 1
    this.setState({ startIndex: 0 });
  }

  _handleOpen = (module) => {
    if (this.props.handleOpen) this.props.handleOpen(module);
    setTimeout(() => (
      this.setState({ isDialogOpen: true, selectedModule: module })), 500);
  }

  handleClose = () => {
    this.setState({
      isDialogOpen: false,
      selectedModule: {},
    });
  }

  handleListButtonTouch = (module) => {
    this.props.addModule(module);
  };

  handleAddToTimetable = (module) => {
    this.props.addModule(module);
    this.handleClose();
  }

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

  isModuleInTimetable = (module) => (
    module.code && this.props.moduleCodesInTimetable.includes(module.code)
  )

  renderListItem = (module) => {
    const inTimetable = this.isModuleInTimetable(module);

    const icon = (
      <IconButton
        disabled={inTimetable}
        onTouchTap={(e) => this.handleListButtonTouch(module, e)}
      >
        <ContentAddBox color={lightGreen500} />
      </IconButton>
    );

    return (
      <ListItem
        key={module.id}
        primaryText={module.code}
        secondaryText={module.title}
        rightIconButton={icon}
        onTouchTap={() => this._handleOpen(module)}
      />
    );
  }

  render() {
    const { isDialogOpen, selectedModule, startIndex } = this.state;
    const { modules, moduleCodesInTimetable } = this.props;

    // Create the list of module cells
    const listItems = modules.slice(startIndex, startIndex + 10).map(this.renderListItem);
    const inTimetable = selectedModule && this.isModuleInTimetable(selectedModule);

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
          handleAddToTimetable={inTimetable ? null : this.handleAddToTimetable}
          handleClose={this.handleClose}
          moduleCodesInTimetable={moduleCodesInTimetable}
        />
      </div>
    );
  }
}

ModuleList.propTypes = {
  modules: PropTypes.array.isRequired,
  addModule: PropTypes.func.isRequired,
  moduleCodesInTimetable: PropTypes.array.isRequired,
  handleOpen: PropTypes.func.isRequired,
};

export default withStyles(s)(ModuleList);
