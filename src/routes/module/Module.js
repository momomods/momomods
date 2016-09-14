import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';

import ModuleList from '../../components/ModuleList/ModuleList';

import s from './Module.css';
import { fetchModules } from '../../actions/module';

const title = 'Modules';

class Module extends Component {
  static propTypes = {
    fetchModules: PropTypes.func.isRequired,
    isInitialized: PropTypes.bool.isRequired,
    modules: PropTypes.array.isRequired,
    semester: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
  }

  static contextTypes = {
    setTitle: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const {
      year,
      semester,
    } = this.props;
    if (!this.props.isInitialized) this.props.fetchModules({ year, semester });
  }

  render() {
    this.context.setTitle(title);

    return (
      <ModuleList modules={this.props.modules} />
    );
  }
}

const mapState = (state) => {
  const { selection, module } = state;
  const { year, semester } = selection;
  const semesterModuleList = (module.data
    && module.data[year]
    && module.data[year][semester]) || [];

  return {
    isFetching: module.isFetching,
    isInitialized: module.isInitialized,
    modules: semesterModuleList,
    semester,
    year,
  };
};

const mapDispatch = {
  fetchModules,
};

export default connect(mapState, mapDispatch)(withStyles(s)(Module));
