import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import VirtualizedSelect from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  addModule,
  removeModule,

  fetchTimetable,
  submitTimetable,

  loadTimetable,
  saveTimetable,
} from '../../actions/timetable';
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
      if (this.props.loggedIn) {
        this.props.fetchTimetable({ year, semester });
      } else {
        this.props.loadTimetable({ year, semester });
      }
    }
    if (this.props.semesterModuleList && this.props.semesterModuleList.length === 0) {
      this.props.fetchModules({ year, semester });
    }
  }

  sync = ({ year, semester, timetable }) => () => {
    this.props.saveTimetable({ year, semester, timetable });

    if (this.props.loggedIn) {
      this.props.submitTimetable({ year, semester, timetable });
    }
  }

  render() {
    const {
      year,
      semester,
      timetable,
      timetableForYearAndSem,
      semesterTimetable,
      semesterModuleList,
    } = this.props;

    const moduleSelectOptions = semesterModuleList
      .filter((module) => (
        !semesterTimetable[module.code]
      ))
      .map((module) => ({
        value: module.code,
        label: `${module.code} ${module.title}`,
      }));
    const filterOptions = createFilterOptions({ options: moduleSelectOptions });

    const lessons = timetableLessonsArray(semesterTimetable);


    const getModuleData = (code, allMods) => (
      allMods.find(m => m.code === code));

    return (
      <div >
        <button
          onClick={this.sync({ year, semester, timetable: timetableForYearAndSem })}
        >
          Sync
        </button>
        <br />
        <Timetable lessons={lessons} timetable={timetable} />
        <br />
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <VirtualizedSelect
              options={moduleSelectOptions}
              filterOptions={filterOptions}
              onChange={module => this.props.addModule(
                { year, semester, module: getModuleData(module.value, semesterModuleList) })}
            />
            <table className="table table-bordered">
              <tbody>
                {_.map(Object.keys(semesterTimetable), (moduleCode) => {
                  const module = timetableForYearAndSem.find(l => l.ModuleCode === moduleCode) || {};

                  return (
                    <tr key={moduleCode}>
                      <td>{module.ModuleCode}</td>
                      <td>{module.ModuleTitle}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            this.props.removeModule({ year, semester, code: moduleCode });
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
  loggedIn: PropTypes.bool.isRequired,
  semester: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  timetableForYearAndSem: PropTypes.array.isRequired,
  semesterModuleList: PropTypes.array,
  semesterTimetable: PropTypes.object,
  addModule: PropTypes.func,
  removeModule: PropTypes.func,
  timetable: PropTypes.object,
  isInitialized: PropTypes.bool,
  fetchTimetable: PropTypes.func.isRequired,
  fetchModules: PropTypes.func.isRequired,
  submitTimetable: PropTypes.func.isRequired,
  saveTimetable: PropTypes.func.isRequired,
  loadTimetable: PropTypes.func.isRequired,
};

TimetableContainer.contextTypes = {
  router: PropTypes.object,
};

function mapStateToProps(state) {
  const { timetable, selection, module } = state;
  const { year, semester } = selection;
  const timetableForYearAndSem =
    (timetable.data
    && timetable.data[year]
    && timetable.data[year][semester]) || [];

  // convert to v3 compatible format first for display
  const semesterTimetable = {};

  timetableForYearAndSem.map(module => {
    if (!semesterTimetable[module.ModuleCode]) {
      semesterTimetable[module.ModuleCode] = {};
    }
    if (!semesterTimetable[module.ModuleCode][module.LessonType]) {
      semesterTimetable[module.ModuleCode][module.LessonType] = [];
    }
    semesterTimetable[module.ModuleCode][module.LessonType].push(module);
    return module;
  });

  const semesterModuleList = (module.data
    && module.data[year]
    && module.data[year][semester]) || [];

  return {
    loggedIn: !!state.user.data.id,
    year,
    semester,
    semesterModuleList,
    semesterTimetable,
    timetableForYearAndSem,
    timetable,
  };
}

const mapDispatch = {
  fetchTimetable,
  fetchModules,
  addModule,
  removeModule,
  saveTimetable,
  submitTimetable,
  loadTimetable,
};

export default connect(
  mapStateToProps, mapDispatch)(withStyles(s)(TimetableContainer));
