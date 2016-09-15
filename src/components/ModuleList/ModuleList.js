import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import AutoComplete from 'material-ui/AutoComplete';
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

  render() {
    // Actions shown on the dialog
    const actions = [
      <FlatButton
        label="Add to Timetable"
        primary
        onTouchTap={this.handleClose}
      />,
    ];

    // Create the list of module cells
    const listItems = this.props.modules.slice(0, 10).map((module, i) => {
      return (
        <ListItem
          key={i}
          primaryText={module.code}
          secondaryText={module.title}
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
            dataSource={this.props.modules}
            onUpdateInput={this.handleUpdateInput}
            floatingLabelText="Module Search"
            fullWidth
          />
        </div>
        <div style={{ height: '70px' }} />
        <List>
          {listItems}
        </List>
        <ModuleListDialog module={this.state.selectedModule} open={this.state.isDialogOpen} handleAddToTimetable={this.handleAddToTimetable} handleClose={this.handleClose}/>
      </div>
    );
  }
}

ModuleList.propTypes = {
  modules: PropTypes.array.isRequired,
};

export default withStyles(s)(ModuleList);
