import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import AutoComplete from 'material-ui/AutoComplete';
import ContentAddBox from 'material-ui/svg-icons/content/add-box';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import { List, ListItem } from 'material-ui/List';
import { lightGreen500 } from 'material-ui/styles/colors';

import s from './ModuleList.css';

class ModuleList extends Component {
  state = {
    open: false,
  }

  handleOpen = (module) => {
    const title = `${module.code} ${module.name}`;
    this.setState({ open: true, dialogTitle: title });
  }

  handleClose = () => (this.setState({ open: false }))

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
        primary
        onTouchTap={this.handleClose}
      />,
    ];

    // Create the list of module cells
    const listItems = this.props.modules.slice(0, 10).map((module, i) => {
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
        <Dialog
          title={this.state.dialogTitle}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <div>
            Dont panic, the module codes shown in the list are
            combined with their key but the dialog just gets the module code only.
          </div>
        </Dialog>
      </div>
    );
  }
}

ModuleList.propTypes = {
  modules: PropTypes.array.isRequired,
};

export default withStyles(s)(ModuleList);
