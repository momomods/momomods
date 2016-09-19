import TextField from 'material-ui/TextField';
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';

import ModuleList from '../../components/ModuleList/ModuleList';

import s from './Module.css';
import { fetchModules } from '../../actions/module';
import { addModule } from '../../actions/timetable';

const title = 'Modules';

class Module extends Component {
  static propTypes = {
    addModule: PropTypes.func,
    addModuleOverride: PropTypes.func,
    fetchModules: PropTypes.func.isRequired,
    isInitialized: PropTypes.bool.isRequired,
    modules: PropTypes.array.isRequired,
    searchIndex: PropTypes.object.isRequired,
    semester: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    moduleCodesInTimetable: PropTypes.array.isRequired,
  }

  static contextTypes = {
    setTitle: PropTypes.func.isRequired,
  }

  static search = null

  state = {
    searchTerm: '',
  }

  componentDidMount = () => {
    const {
      year,
      semester,
    } = this.props;
    if (!this.props.isInitialized) this.props.fetchModules({ year, semester });
  }

  getFilteredModules = () => {
    const searchTerm = this.state.searchTerm;
    const { modules, searchIndex } = this.props;

    if (!searchTerm || searchTerm === '' || searchIndex === null) return modules;
    return searchIndex.search(searchTerm);
  };

  handleUpdateInput = (e) => (this.setState({ searchTerm: e.target.value }))

  _addModule = (module) => {
    const { year, semester } = this.props;
    if (this.props.addModuleOverride) {
      this.props.addModuleOverride({ year, semester, module });
    } else {
      this.props.addModule({ year, semester, module });
    }
  }

  render() {
    this.context.setTitle(title);

    return (
      <div>
        <div className={s.moduleSearchBar}>
          <TextField
            fullWidth
            hintText="Search for a module e.g. CS1010"
            onChange={this.handleUpdateInput}
          />
        </div>
        <div style={{ height: '48px' }} />
        <ModuleList
          modules={this.getFilteredModules()}
          addModule={this._addModule}
          moduleCodesInTimetable={this.props.moduleCodesInTimetable}
        />
      </div>
    );
  }
}

const mapState = (state) => {
  const { selection, module, searchIndex, timetable } = state;
  const { year, semester } = selection;
  const semesterModuleList = (module.data
    && module.data[year]
    && module.data[year][semester]) || [];
  const idx = (searchIndex.data
    && searchIndex.data[year]
    && searchIndex.data[year][semester]) || null;

  const lessons = (
    (timetable.data && timetable.data[year] && timetable.data[year][semester])
    || []);
  const moduleCodesInTimetable = lessons.map(l => l.ModuleCode);

  return {
    isFetching: module.isFetching,
    isInitialized: module.isInitialized,
    modules: semesterModuleList,
    searchIndex: idx,
    semester,
    year,
    moduleCodesInTimetable,
  };
};

const mapDispatch = {
  fetchModules,
  addModule,
};

export default connect(mapState, mapDispatch)(withStyles(s)(Module));
