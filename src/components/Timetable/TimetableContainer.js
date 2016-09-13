import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import VirtualizedSelect from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { removeModule } from '../../actions/timetables';
import { addModule, fetchTimetable } from '../../actions/timetable';
import { fetchModules } from '../../actions/module';
import { timetableLessonsArray } from '../../utils/modules';
import Timetable from './Timetable';
import s from './timetable.scss';

// Ref: https://github.com/yangshun/nusmods-v3/tree/master/src/js

class TimetableContainer extends Component {
  componentDidMount() {
    const {
      year,
      semester,
    } = this.props;
    const {
      isInitialized,
    } = this.props.timetable;


    if (!isInitialized) {
      this.props.fetchTimetable({ year, semester });
    }
    if (!this.props.allModules.isInitialized) {
      this.props.fetchModules({ year, semester });
    }
  }

  render() {
    const moduleSelectOptions = this.props.semesterModuleList
      .filter((module) => (
        !this.props.semesterTimetable[module.code]
      ))
      .map((module) => ({
        value: module.code,
        label: `${module.code} ${module.title}`,
      }));
    const filterOptions = createFilterOptions({ options: moduleSelectOptions });

    const lessons = timetableLessonsArray(this.props.semesterTimetable);

    const {
      addModule,
      year,
      semester,
      timetable,
      semesterTimetable,
      modules,
      allModules,
    } = this.props;

    const getModuleData = (code, allModules) => allModules.data[year][semester].find(m => m.code == code);

    return (
      <div >
        <br />
        <Timetable lessons={lessons} timetable={timetable} />
        <br />
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <VirtualizedSelect
              options={moduleSelectOptions}
              filterOptions={filterOptions}
              onChange={module => addModule({year, semester, module: getModuleData(module.value, allModules)})}
            />
            <table className="table table-bordered">
              <tbody>
                {_.map(Object.keys(semesterTimetable), (moduleCode) => {
                  const module = modules[moduleCode] || {};
                  return (
                    <tr key={moduleCode}>
                      <td>{module.code}</td>
                      <td>{module.title}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            this.props.removeModule(semester, moduleCode);
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
  semester: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  semesterModuleList: PropTypes.array,
  semesterTimetable: PropTypes.object,
  modules: PropTypes.object,
  allModules: PropTypes.object,
  addModule: PropTypes.func,
  removeModule: PropTypes.func,
  timetable: PropTypes.object,
  isInitialized: PropTypes.bool,
  fetchTimetable: PropTypes.func.isRequired,
  fetchModules: PropTypes.func.isRequired,
};

TimetableContainer.contextTypes = {
  router: PropTypes.object,
};

function mapStateToProps(state) {
  const { timetable, selection } = state;
  const { year, semester } = selection;
  const timetableForYearAndSem =
    (timetable.data
    && timetable.data[year]
    && timetable.data[year][semester]) || []

  // convert to v3 compatible format first for display
  const tt = {};

  timetableForYearAndSem.map(module => {
    if (!tt[module.ModuleCode]) {
      tt[module.ModuleCode] = {};
    }
    if (!tt[module.ModuleCode][module.LessonType]) {
      tt[module.ModuleCode][module.LessonType] = [];
    }
    tt[module.ModuleCode][module.LessonType].push(module);
    return module;
  });

  let semesterModuleList = state.module.data
    && state.module.data[year]
    && state.module.data[year][semester];
  semesterModuleList = semesterModuleList || [];

  const moduledetail = {};
  timetableForYearAndSem.forEach(mod =>
      (moduledetail[mod.ModuleCode] = semesterModuleList.find(
        m => m.code === mod.ModuleCode
      )));

  return {
    year,
    semester,
    semesterModuleList,
    semesterTimetable: tt,
    timetable,
    modules: moduledetail,
    allModules: state.module,
  };
}

const mapDispatch = {
  fetchTimetable,
  fetchModules,
  addModule,
  removeModule,
};

export default connect(
  mapStateToProps, mapDispatch)(withStyles(s)(TimetableContainer));
