import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { fetchGroup } from '../../actions/group';
import Timeshare from './TimeShare';
import ShareDialog from '../../components/ShareDialog/';
import SocialShare from 'material-ui/svg-icons/social/share';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import s from './timetable.scss';

// Ref: https://github.com/yangshun/nusmods-v3/tree/master/src/js

class TimeShareContainer extends Component {
  state = {
      isSharing: true,
      isShareDialogOpen: false
  };

  handleOpen = () => {
      this.setState({isShareDialogOpen: true});
  }

  handleClose = () => {
      this.setState({isShareDialogOpen: false});
  }

  render() {
    const {
      timetable,
      group,
    } = this.props;

    return (
      <div>
          <Timeshare
            timetable={timetable}
            group={group}
            isSharing={this.state.isSharing}
          />
          <FloatingActionButton onTouchTap={this.handleOpen} className="fab">
            <SocialShare />
          </FloatingActionButton>
          <ShareDialog
            open={this.state.isShareDialogOpen}
            handleClose={this.handleClose}
            text={this.props.freeTimeText}
          />
      </div>
    );
  }
}

TimeShareContainer.propTypes = {
  colors: PropTypes.object,
  group: PropTypes.object,
  timetable: PropTypes.object.isRequired,
  freeTimeText: PropTypes.string.isRequired,
};

const mapState = (state) => ({
  timetable: state.timetable,
});

const mapDispatch = {
  fetchGroup,
};

export default connect(mapState, mapDispatch)(withStyles(s)(TimeShareContainer));
