import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import ContentAddBox from 'material-ui/svg-icons/content/add-box';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import { lightGreen500 } from 'material-ui/styles/colors';

import s from './ModuleListDialog.css';

class ModuleListDialog extends Component {

  render() {
    return (
        <Dialog
          title={this.props.module.code + ' ' + this.props.module.title}
          actions={<FlatButton
                label="Add to Timetable"
                primary
                onTouchTap={() => this.props.handleAddToTimetable(this.props.module)}
              />}
          modal={false}
          open={this.props.open}
          onRequestClose={this.props.handleClose}
          autoScrollBodyContent
        >
          <div>
            <h3>Description</h3>
            <p>{this.props.module.description}</p>
            <h3>Semesters Offered</h3>
            <p>{this.props.module.semester}</p>
            <h3>Modular Credits</h3>
            <p>{this.props.module.credit} MCs</p>
            <h3>Preclusions</h3>
            <p>{this.props.module.preclusion}</p>
            <h3>Department</h3>
            <p>{this.props.module.department}</p>
            <h3>Weekly Workload</h3>
            <p>{this.props.module.workload}</p>
            <h3>Exam Dates</h3>
            <p>Semester {this.props.module.semester}: {this.props.module.examDate}</p>
          </div>
        </Dialog>
    );
  }
}

ModuleListDialog.propTypes = {
  module: PropTypes.object.isRequired,
  handleAddToTimetable: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default withStyles(s)(ModuleListDialog);
