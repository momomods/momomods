import React, { PropTypes } from 'react';

const ModuleTable = ({
  modules,
  removeModule,
}) => (
  <table className="table table-bordered">
    <tbody>
      {modules.map(module =>
        <tr key={module.ModuleCode}>
          <td>{module.ModuleCode}</td>
          <td>{module.ModuleTitle}</td>
          <td>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => removeModule(module.ModuleCode)}
            >
              Remove
            </button>
          </td>
        </tr>
      )}
    </tbody>
  </table>
);

ModuleTable.propTypes = {
  modules: PropTypes.array.isRequired,
  removeModule: PropTypes.func.isRequired,
};

export default ModuleTable;
