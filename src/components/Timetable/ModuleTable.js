import React, { PropTypes } from 'react';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

const ModuleTable = ({
  modules,
  removeModule,
}) => (
  <Table
    selectable={false}
    style={{ tableLayout: 'auto' }}
  >
    <TableBody
      displayRowCheckbox={false}
    >
      {modules.map(module =>
        <TableRow key={module.ModuleCode}>
          <TableRowColumn>{module.ModuleCode}</TableRowColumn>
          <TableRowColumn>{module.ModuleTitle}</TableRowColumn>
          <TableRowColumn>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => removeModule(module.ModuleCode)}
            >
              Remove
            </button>
          </TableRowColumn>
        </TableRow>
      )}
    </TableBody>
  </Table>
);

ModuleTable.propTypes = {
  modules: PropTypes.array.isRequired,
  removeModule: PropTypes.func.isRequired,
};

export default ModuleTable;
