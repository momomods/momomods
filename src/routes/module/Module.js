import AutoComplete from 'material-ui/AutoComplete';
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

  state = {
    searchTerm: '',
  }

  componentDidMount() {
    const {
      year,
      semester,
    } = this.props;
    if (!this.props.isInitialized) this.props.fetchModules({ year, semester });
  }

  handleUpdateInput = (searchTerm) => (this.setState({ searchTerm }))

  getFilterItems = () => {
    const searchTerm = this.state.searchTerm;
    if (!searchTerm || searchTerm === '') return this.props.modules;
    return this.props.modules.filter(m => (
      m.code.indexOf(searchTerm) >= 0
    ));
  };

  render() {
    this.context.setTitle(title);
    const modules = this.getFilterItems(this.props.modules);

    return (
      <div>
        <div style={{ position: 'fixed', zIndex: 10, left: '15px', right: '15px' }}>
          <AutoComplete
            hintText="Search for modules..."
            dataSource={modules.map(m => m.name)}
            onUpdateInput={this.handleUpdateInput}
            floatingLabelText="Module Search"
            fullWidth
          />
        </div>
        <div style={{ height: '70px' }} />
        <ModuleList modules={modules} />
      </div>
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
