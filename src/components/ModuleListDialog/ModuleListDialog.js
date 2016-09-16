import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import ContentAddBox from 'material-ui/svg-icons/content/add-box';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import { lightGreen500 } from 'material-ui/styles/colors';

import s from './ModuleListDialog.css';

/*
 * This is a Dialog that shows module information.
 *
 * Requires a module, a param to indicate if dialog is open,
 * and handlers for tapping the close button, and add to timetable button.
 */
class ModuleListDialog extends Component {
  displayName = 'ModuleListDialog'

  handleAdd = () => this.props.handleAddToTimetable(this.props.module)

  render() {
    let {
      handleAddToTimetable,
      handleClose,
      module,
      open,
    } = this.props;
    const title = `${module.code} ${module.title}`;

    let actions = []
    if (handleAddToTimetable) {
      actions = [
        <FlatButton
          label="Add to Timetable"
          primary
          onTouchTap={() => handleAddToTimetable(module)}
        />];
    }

    return (
      <Dialog
        title={title}
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={handleClose}
        autoScrollBodyContent
      >
        <div>
          <h3>Description</h3>
          <p>{module.description}</p>
          <h3>Semesters Offered</h3>
          <p>{module.semester}</p>
          <h3>Modular Credits</h3>
          <p>{module.credit} MCs</p>
          <h3>Preclusions</h3>
          <p>{module.preclusion}</p>
          <h3>Department</h3>
          <p>{module.department}</p>
          <h3>Weekly Workload</h3>
          <p>{module.workload}</p>
          <h3>Exam Dates</h3>
          <p>Semester {module.semester}: {module.examDate}</p>
        </div>
      </Dialog>
    );
  }
}

ModuleListDialog.propTypes = {
  handleAddToTimetable: PropTypes.func,
  handleClose: PropTypes.func.isRequired,
  module: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
};

export default withStyles(s)(ModuleListDialog);
