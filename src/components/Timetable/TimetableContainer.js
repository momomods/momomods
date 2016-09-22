import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import {
  addModule,
  removeModule,
  changeLesson,
  changeToLesson,
  cancelChangeLesson,

  fetchTimetable,
  submitTimetable,

  loadTimetable,
  saveTimetable,
} from '../../actions/timetable';
import { fetchModules } from '../../actions/module';
import { timetableLessonsArray, isSameClass } from '../../utils/modules';
import { lessonsForLessonType, areOtherClassesAvailable } from '../../utils/timetable';
import Timetable from './Timetable';
import s from './timetable.scss';
import ModuleTable from './ModuleTable';
import SearchOverlay from '../../components/SearchOverlay/';

// Ref: https://github.com/yangshun/nusmods-v3/tree/master/src/js

class TimetableContainer extends Component {
  state = {
    showSearch: false,
    isSharing: false,
  }

  showSearch= () => this.setState({ showSearch: true })
  hideSearch= () => this.setState({ showSearch: false })

  addModuleAndHideSearch = ({ module }) => {
    const { year, semester } = this.props;
    this.props.addModule({ year, semester, module });
    this.hideSearch();
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

    const changeLessonHelper = (lesson) => {
      if (lesson.isAvailable) {
        this.props.changeToLesson({ year, semester, activeLesson: lesson });
      } else if (lesson.isActive) {
        this.props.cancelChangeLesson();
      } else {
        // begin selection of module
        this.props.changeLesson({ activeLesson: lesson });
      }
    };

    const moduleTableModules = Object.values(
      timetableForYearAndSem.reduce(
        (p, c) => ({ ...p, [c.ModuleCode]: c }), {}));

    let timetableLessons = timetableLessonsArray(semesterTimetable);

    if (this.props.activeLesson) {
      const activeLesson = this.props.activeLesson;
      const moduleDetail = activeLesson.moduleDetail;
      const moduleCode = activeLesson.ModuleCode;

      const moduleTimetable = JSON.parse(activeLesson.moduleDetail.timetable || null);
      const lessons = lessonsForLessonType(moduleTimetable, activeLesson.LessonType)
        .map(lesson => (
          // Inject module detail in
          { ...lesson, moduleDetail, ModuleCode: moduleCode }
        ));
      const otherAvailableLessons = lessons
        .filter(lesson => (
          // Exclude the lesson being modified.
          !isSameClass(lesson, activeLesson)
        ))
        .map((lesson) => (
          { ...lesson, isAvailable: true }
        ));
      timetableLessons = timetableLessons.map((lesson) => {
        // Identify the current lesson being modified.
        if (isSameClass(lesson, activeLesson)) {
          return { ...lesson, isActive: true };
        }
        return lesson;
      });
      timetableLessons = [...timetableLessons, ...otherAvailableLessons];
    }

    timetableLessons.forEach((lesson) => {
      const moduleTimetable = JSON.parse(lesson.moduleDetail.timetable || null);
      lesson.isModifiable = areOtherClassesAvailable( // eslint-disable-line no-param-reassign
        moduleTimetable, lesson.LessonType);
    });
    return (
      <div
        onClick={() => {
          if (this.props.activeLesson) {
            this.props.cancelChangeLesson();
          }
        }}
      >
        <Timetable
          lessons={timetableLessons}
          timetable={timetable}
          onLessonChange={changeLessonHelper}
          isSharing={this.state.isSharing}
        />
        <ModuleTable
          modules={moduleTableModules}
          removeModule={(code) => this.props.removeModule({ year, semester, code })}
        />

        <FloatingActionButton onTouchTap={this.showSearch} className="fab">
          <ContentAdd />
        </FloatingActionButton>

        <SearchOverlay
          shown={this.state.showSearch}
          hideSearch={this.hideSearch}
          semesterModuleList={semesterModuleList}
          semesterTimetable={semesterTimetable}
          addModule={this.addModuleAndHideSearch}
        />
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
  activeLesson: PropTypes.object,
  addModule: PropTypes.func,
  removeModule: PropTypes.func,
  changeLesson: PropTypes.func,
  changeToLesson: PropTypes.func,
  cancelChangeLesson: PropTypes.func,
  timetable: PropTypes.object,
  isInitialized: PropTypes.bool,
  fetchTimetable: PropTypes.func.isRequired,
  fetchModules: PropTypes.func.isRequired,
  submitTimetable: PropTypes.func.isRequired,
  saveTimetable: PropTypes.func.isRequired,
  loadTimetable: PropTypes.func.isRequired,
  colors: PropTypes.object,
};

TimetableContainer.contextTypes = {
  router: PropTypes.object,
};

function mapStateToProps(state) {
  const { timetable, selection, module } = state;
  const { activeLesson } = timetable;
  const { year, semester } = selection;
  const timetableForYearAndSem =
    (timetable.data
    && timetable.data[year]
    && timetable.data[year][semester]) || [];

  // convert to v3 compatible format first for display
  const semesterTimetable = {};

  timetableForYearAndSem.map(mod => {
    if (!semesterTimetable[mod.ModuleCode]) {
      semesterTimetable[mod.ModuleCode] = {};
    }
    if (!semesterTimetable[mod.ModuleCode][mod.LessonType]) {
      semesterTimetable[mod.ModuleCode][mod.LessonType] = [];
    }
    semesterTimetable[mod.ModuleCode][mod.LessonType].push(mod);
    return mod;
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
    activeLesson,
  };
}

const mapDispatch = {
  fetchTimetable,
  fetchModules,
  addModule,
  removeModule,
  changeLesson,
  changeToLesson,
  cancelChangeLesson,
  saveTimetable,
  submitTimetable,
  loadTimetable,
};

export default connect(
  mapStateToProps, mapDispatch)(withStyles(s)(TimetableContainer));
