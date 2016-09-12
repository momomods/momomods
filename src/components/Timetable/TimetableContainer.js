import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import VirtualizedSelect from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { addModule, removeModule } from '../../actions/timetables';
import { fetchTimetable } from '../../actions/timetable';
import { fetchNusModsModules, fetchNusModsModuleDetail } from '../../actions/module';
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
    if (!this.props.moduleList.isInitialized) {
      this.props.fetchNusModsModules({ year });
    }
  }

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
  semester: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  semesterModuleList: PropTypes.array,
  semesterTimetable: PropTypes.object,
  modules: PropTypes.object,
  moduleList: PropTypes.object,
  addModule: PropTypes.func,
  removeModule: PropTypes.func,
  timetable: PropTypes.object,
  isInitialized: PropTypes.bool,
  fetchTimetable: PropTypes.func.isRequired,
  fetchNusModsModules: PropTypes.func.isRequired,
  fetchNusModsModuleDetail: PropTypes.func.isRequired,
};

TimetableContainer.contextTypes = {
  router: PropTypes.object,
};

function mapStateToProps(state) {
  const { timetable, selection } = state;
  const { year, semester } = selection;
  const timetableForYearAndSem = timetable.data.filter(
    t => t.year === year && t.semester === semester
  )[0] || { data: [] };

  // convert to v3 compatible format first for display
  const tt = {};

  timetableForYearAndSem.data.map(module => {
    if (!tt[module.ModuleCode]) {
      tt[module.ModuleCode] = {};
    }
    if (!tt[module.ModuleCode][module.LessonType]) {
      tt[module.ModuleCode][module.LessonType] = [];
    }
    tt[module.ModuleCode][module.LessonType].push(module);
    return module;
  });

  return {
    year,
    semester,
    semesterModuleList: state.entities.moduleBank.moduleList.filter((module) => (
      _.includes(module.Semesters, semester)
    )),
    semesterTimetable: tt,
    timetable,
    modules: state.moduledetail.data,
    moduleList: state.module,
  };
}

const mapDispatch = {
  fetchTimetable,
  fetchNusModsModules,
  fetchNusModsModuleDetail,
  addModule,
  removeModule,
};

export default connect(
  mapStateToProps, mapDispatch)(withStyles(s)(TimetableContainer));
