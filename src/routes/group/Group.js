/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';

import GroupToolbar from '../../components/GroupToolbar/GroupToolbar';
import Link from '../../components/Link/Link';
import TimeShareContainer from '../../components/Timetable/TimeShareContainer';

import s from './Group.css';
import { fetchGroups } from '../../actions/group';
import { fetchFriends } from '../../actions/friend';
import { changeDate } from '../../actions/selection';
import { fetchGroupTimetable } from '../../actions/timeshare';

const title = 'Groups';

class Group extends Component {
  static propTypes = {
    friend: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    semester: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    fetchGroups: PropTypes.func.isRequired,
    fetchGroupTimetable: PropTypes.func.isRequired,
  }

  static contextTypes = {
    setTitle: PropTypes.func.isRequired,
  }

  state = {
    groupShown: null,
    groupId: null,
    freeTimeText: 'Please replace this with sth else soon',
  }

  componentWillMount() {
    // Initialize timesharing table
    this.state.groupShown = this.props.group.data[0] || {};
    this.state.groupId = this.state.groupShown.teamId;
    if (this.state.groupId && this.state.date) {
      this.props.fetchGroupTimetable({
        groupId: this.state.groupId,
        date: this.formatDate(this.props.date),
      });
    }
  }

  componentDidMount() {
    const { year, semester, isLoggedIn, group } = this.props;
    if (!group.isInitialized && isLoggedIn) {
      this.props.fetchGroups({ year, semester });
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.group.data.length != nextProps.group.data.length) {
      this.setState({
        groupShown: nextProps.group.data[0] || {},
      });
    }
  }

  formatDate(date) {
    return '' + date.getFullYear() + '-' + ('00' + (date.getMonth() + 1)).slice(-2) + '-' + ('00' + date.getDate()).slice(-2); // eslint-disable-line prefer-template, max-len
  }

  handleGroupChange = (event, key, groupId) => {
    this.state.groupShown = this.props.group.data.find(d => d.teamId === groupId);
    this.state.groupId = groupId;
    this.props.fetchGroupTimetable({
      groupId,
      date: this.formatDate(this.props.date),
    });
  }

  handleDateChange = (event, date) => {
    console.log(date);
    this.props.changeDate({ date });
    this.setState({
      date: this.formatDate(date),
    }, () => {
      if (this.state.groupId) {
        this.props.fetchGroupTimetable({
          groupId: this.state.groupId,
          date: this.formatDate(this.props.date),
        });
      }
    });
    return { event, date };
  }

  render() {
    if (!this.props.isLoggedIn) {
      return (
        <div className={s.notLoggedInContainer}>
          <div className={s.logoContainer}>
            <img src="/facebook.png" alt="facebook logo" />
          </div>
          <div className={s.textContainer}>
            <span>Please </span>
            <Link to="/login">
              login
            </Link>
            <span> to compare your timetable!</span>
          </div>
        </div>
      );
    }
    this.context.setTitle(title);

    const noGroupContainer = (
      <div className={s.noGroupContainer}>
        <p>You do not have any groups. Create one!</p>
        <img src="/group.png" alt="group" />
      </div>
    );

    const holidayContainer = (
      <div className={s.holidayContainer}>
        <p>It's school break!</p>
        <img src="/vacation.png" alt="school break" />
      </div>
    );

    /* eslint-disable */
    const dummydata = {
            "createdBy": {
                "userId": "3",
                "name": "Zhi An"
            },
            "teamId": "{id}",
            "teamName": "3216 final project",
            "year": "2016-2017",
            "semester": "1",
            "members": [
                {
                    "userId": "1",
                    "name": "Niko",
                    "acceptInvitation": 1,
                    "timetable": [
                        {
                            "id": 2,
                            "timetableId": 1,
                            "moduleId": 514,
                            "lessonType": "sectional",
                            "classNumber": 1,
                            "createdAt": "2016-09-12T08:26:51.449Z",
                            "updatedAt": "2016-09-12T08:26:51.449Z",
                            "module": {
                                "id": 514,
                                "year": "2016-2017",
                                "semester": 1,
                                "code": "CS1010",
                                "title": "Programming Methodology",
                                "description": "This is CS1010.",
                                "department": "Computer Science",
                                "credit": 4,
                                "workload": "2-1-1-3-3",
                                "prerequisite": null,
                                "preclusion": "CG1101, CS1010E",
                                "examDate": "2016-11-23T01:00:00.000Z",
                                "timetable": {
                                    "ClassNo": "B3",
                                    "LessonType": "Laboratory",
                                    "WeekText": "Odd Week",
                                    "DayText": "Wednesday",
                                    "StartTime": "1400",
                                    "EndTime": "1700",
                                    "Venue": "S12-0402"
                                },
                                "createdAt": "2016-09-12T08:33:46.506Z",
                                "updatedAt": "2016-09-12T08:33:46.507Z"
                            }
                        },
                        {
                            "id": 3,
                            "timetableId": 1,
                            "moduleId": 522,
                            "lessonType": "sectional",
                            "classNumber": 1,
                            "createdAt": "2016-09-12T08:26:51.450Z",
                            "updatedAt": "2016-09-12T08:26:51.450Z",
                            "module": {
                                "id": 522,
                                "year": "2016-2017",
                                "semester": 1,
                                "code": "CS1231",
                                "title": "Discrete Structures",
                                "description": "This is CS1231",
                                "department": "Computer Science",
                                "credit": 4,
                                "workload": "3-1-0-3-3",
                                "prerequisite": "A-level Mathematics or H2 Mathematics or MA1301 or MA1301FC or MA1301X",
                                "preclusion": "MA1100",
                                "examDate": "2016-11-23T09:00:00.000Z",
                                "timetable": {
                                    "ClassNo": "4",
                                    "LessonType": "Tutorial",
                                    "WeekText": "Every Week",
                                    "DayText": "Wednesday",
                                    "StartTime": "1100",
                                    "EndTime": "1200",
                                    "Venue": "COM1-0209"
                                },
                                "createdAt": "2016-09-12T08:33:46.542Z",
                                "updatedAt": "2016-09-12T08:33:46.542Z"
                            }
                        }
                    ]
                },
                {
                    "userId": "3",
                    "name": "Zhi An",
                    "acceptInvitation": 0,
                    "timetable": [
                        {
                            "id": 3,
                            "timetableId": 1,
                            "moduleId": 522,
                            "lessonType": "sectional",
                            "classNumber": 1,
                            "createdAt": "2016-09-12T08:26:51.450Z",
                            "updatedAt": "2016-09-12T08:26:51.450Z",
                            "module": {
                                "id": 522,
                                "year": "2016-2017",
                                "semester": 1,
                                "code": "CS1231",
                                "title": "Discrete Structures",
                                "description": "This is CS1231",
                                "department": "Computer Science",
                                "credit": 4,
                                "workload": "3-1-0-3-3",
                                "prerequisite": "A-level Mathematics or H2 Mathematics or MA1301 or MA1301FC or MA1301X",
                                "preclusion": "MA1100",
                                "examDate": "2016-11-23T09:00:00.000Z",
                                "timetable": {
                                    "ClassNo": "4",
                                    "LessonType": "Tutorial",
                                    "WeekText": "Every Week",
                                    "DayText": "Wednesday",
                                    "StartTime": "1100",
                                    "EndTime": "1200",
                                    "Venue": "COM1-0209"
                                },
                                "createdAt": "2016-09-12T08:33:46.542Z",
                                "updatedAt": "2016-09-12T08:33:46.542Z"
                            }
                        }
                    ]
                }
            ]
        };
    /* eslint-enable */

    let timeShareContainer = null;
    if (!this.props.group.isFetching && this.props.group.isInitialized) {
      if (this.props.group.data.length > 0 && !this.props.timeshare.isFetching) {
        if (this.props.timeshare.data.holiday) {
          timeShareContainer = holidayContainer;
        } else {
          const groupData = this.props.timeshare.data || {};
          timeShareContainer = <TimeShareContainer group={groupData} freeTimeText={this.state.freeTimeText}/>;
        }
      } else {
        timeShareContainer = noGroupContainer;
      }
    }

    return (
      <div>
        <GroupToolbar
          groupShown={this.state.groupShown}
          groups={this.props.group.data}
          handleGroupChange={this.handleGroupChange}
          handleDateChange={this.handleDateChange}
          selectedDate={new Date(this.props.date)}
        />
        {timeShareContainer}
      </div>
    );
  }
}

Group.propTypes = {
  timeshare: PropTypes.object,
};

const mapState = (state) => ({
  year: state.selection.year,
  semester: state.selection.semester,
  date: state.selection.date,
  isLoggedIn: !!state.user.data.id,
  group: state.group,
  friend: state.friend,
  timeshare: state.timeshare,
});

const mapDispatch = {
  fetchGroups,
  fetchFriends,
  fetchGroupTimetable,
  changeDate,
};

export default connect(mapState, mapDispatch)(withStyles(s)(Group));
