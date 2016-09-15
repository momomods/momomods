import React, { PropTypes } from 'react';

import ActionDelete from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import { List, ListItem } from 'material-ui/List';
import { red700 } from 'material-ui/styles/colors';

const ModuleTable = ({
  modules,
  removeModule,
}) => (
  <List>
    {modules.map(module =>
      <ListItem
        rightIconButton={
          <IconButton
            onTouchTap={() => removeModule(module.ModuleCode)}
            touch={true}
            tooltip="Remove module"
            tooltipPosition="bottom-left"
          >
            <ActionDelete color={red700} />
          </IconButton>
        }
        primaryText={module.ModuleCode}
        secondaryText={module.ModuleTitle}
      />
    )}
  </List>
);

ModuleTable.propTypes = {
  modules: PropTypes.array.isRequired,
  removeModule: PropTypes.func.isRequired,
};

export default ModuleTable;
