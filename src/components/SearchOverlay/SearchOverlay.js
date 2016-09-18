import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './SearchOverlay.css';

import Module from '../../routes/module/Module';

class SearchOverlay extends Component {
  shouldComponentUpdate = (nextProps) => (
    (nextProps.shown !== this.props.shown) ||
    (nextProps.semesterModuleList !== this.props.semesterModuleList))

  render() {
    if (!this.props.shown) return null;
    return (
      <div className={s.overlayRoot}>
        <div className={s.overlayContent}>
          <div className={s.overlayFixed}>
            <IconButton onTouchTap={this.props.hideSearch}>
              <NavigationClose color="black" />
            </IconButton>
          </div>
          <div style={{ height: '48px' }} />
          <Module addModuleOverride={this.props.addModule} />
        </div>
        <div className={s.overlayBlock} onClick={this.props.hideSearch} />
      </div>
    );
  }
}

SearchOverlay.propTypes = {
  shown: PropTypes.bool.isRequired,
  hideSearch: PropTypes.func.isRequired,
  semesterModuleList: PropTypes.array.isRequired,
  semesterTimetable: PropTypes.object.isRequired,
  addModule: PropTypes.func.isRequired,
};

export default withStyles(s)(SearchOverlay);
