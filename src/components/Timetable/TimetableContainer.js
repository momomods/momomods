import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import VirtualizedSelect from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import config from '../../constants/modsConfig';
import { addModule, removeModule } from '../../actions/timetables';
import { timetableLessonsArray } from '../../utils/modules';
import Timetable from './Timetable';
import s from './timetable.scss';

// Ref: https://github.com/yangshun/nusmods-v3/tree/master/src/js

/*eslint-disable */
export class TimetableContainer extends Component {
/*eslint-enable */
  render() {
    const moduleSelectOptions = this.props.semesterModuleList
      .filter((module) => (
        !this.props.semesterTimetable[module.ModuleCode]
      ))
      .map((module) => ({
        value: module.ModuleCode,
        label: `${module.ModuleCode} ${module.ModuleTitle}`,
      }));
    const filterOptions = createFilterOptions({ options: moduleSelectOptions });

    const lessons = timetableLessonsArray(this.props.semesterTimetable);

    return (
      <div >
        <br />
        <Timetable lessons={lessons} timetable={this.props.timetable} />
        <br />
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <VirtualizedSelect
              options={moduleSelectOptions}
              filterOptions={filterOptions}
              onChange={(module) => {
                this.props.addModule(this.props.semester, module.value);
              }}
            />
            <table className="table table-bordered">
              <tbody>
                {_.map(Object.keys(this.props.semesterTimetable), (moduleCode) => {
                  const module = this.props.modules[moduleCode] || {};
                  return (
                    <tr key={moduleCode}>
                      <td>{module.ModuleCode}</td>
                      <td>{module.ModuleTitle}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            this.props.removeModule(this.props.semester, moduleCode);
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

TimetableContainer.propTypes = {
  semester: PropTypes.number,
  semesterModuleList: PropTypes.array,
  semesterTimetable: PropTypes.object,
  modules: PropTypes.object,
  addModule: PropTypes.func,
  removeModule: PropTypes.func,
  timetable: PropTypes.object,
};

TimetableContainer.contextTypes = {
  router: PropTypes.object,
};

function mapStateToProps(state) {
  const semester = config.semester;

  return {
    semester,
    semesterModuleList: state.entities.moduleBank.moduleList.filter((module) => (
      _.includes(module.Semesters, semester)
    )),
    semesterTimetable: state.timetables[semester] || {},
    timetable: state.timetable,
    modules: state.entities.moduleBank.modules,
    isInitialized: true,
  };
}

const TimetableExport = connect(
  mapStateToProps,
  {
    addModule,
    removeModule,
  }
)(withStyles(s)(TimetableContainer));

export { TimetableExport };
