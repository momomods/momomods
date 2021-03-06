import React, { Component, PropTypes } from 'react';

import ActionDelete from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import { List, ListItem } from 'material-ui/List';
import { red700 } from 'material-ui/styles/colors';

import ModuleListDialog from '../ModuleListDialog';

class ModuleTable extends Component {
  // modules,
  // removeModule,
  state = {
    isDialogOpen: false,
    selectedModule: {},
    startIndex: 0,
  }

  handleOpen = (module) => {
    this.setState({ isDialogOpen: true, selectedModule: module.moduleDetail });
  }

  handleClose = () => (this.setState({ isDialogOpen: false }))

  render() {
    const { isDialogOpen, selectedModule } = this.state;
    const { modules, removeModule } = this.props;
    return (
      <div className="module-table">
        <List style={{ width: '100%', paddingLeft: '15%' }}>
          {modules.map(module =>
            <ListItem
              key={module.moduleDetail.code}
              rightIconButton={
                <IconButton
                  onTouchTap={() => removeModule(module.moduleDetail.code)}
                  touch
                  tooltip="Remove module"
                  tooltipPosition="bottom-left"
                >
                  <ActionDelete color={red700} />
                </IconButton>
              }
              primaryText={module.moduleDetail.code}
              secondaryText={module.moduleDetail.title}
              onTouchTap={() => this.handleOpen(module)}
            />
          )}
        </List>
        <ModuleListDialog
          module={selectedModule}
          open={isDialogOpen}
          handleClose={this.handleClose}
        />
      </div>
    );
  }
}

ModuleTable.propTypes = {
  modules: PropTypes.array.isRequired,
  removeModule: PropTypes.func.isRequired,
};

export default ModuleTable;
