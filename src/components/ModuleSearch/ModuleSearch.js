import React, { Component, PropTypes } from 'react';
import VirtualizedSelect from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';

class ModuleSearch extends Component {
  shouldComponentUpdate = (nextProps) => {
    return (nextProps.semesterModuleList !== this.props.semesterModuleList) ||
           (nextProps.semesterTimetable !== this.props.semesterTimetable);
  }

  render = () =>  {
    const { semesterModuleList, semesterTimetable } = this.props;

    const moduleSelectOptions = semesterModuleList
      .filter(module => !semesterTimetable[module.code])
      .map((module) => ({
        value: module.code,
        label: `${module.code} ${module.title}`,
      }));
    const filterOptions = createFilterOptions({ options: moduleSelectOptions });

    const getModuleData = code => semesterModuleList.find(m => m.code === code);

    return (
      <VirtualizedSelect
        options={moduleSelectOptions}
        filterOptions={filterOptions}
        onChange={module => this.props.addModule(getModuleData(module.value))}
      />
    )
  }
}

ModuleSearch.propTypes = {
  semesterModuleList: PropTypes.array.isRequired,
  semesterTimetable: PropTypes.object.isRequired,
  addModule: PropTypes.func.isRequired,
};

export default ModuleSearch;
