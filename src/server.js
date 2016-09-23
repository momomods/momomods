/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'babel-polyfill';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import expressGraphQL from 'express-graphql';
import jwt from 'jsonwebtoken';
import React from 'react';
import ReactDOM from 'react-dom/server';
import UniversalRouter from 'universal-router';
import PrettyError from 'pretty-error';
import moment from 'moment';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import passport from './core/passport';
import schema from './data/schema';
import routes from './routes';
import createHistory from './core/createHistory';
import assets from './assets'; // eslint-disable-line import/no-unresolved
import configureStore from './store/configureStore';
import { setRuntimeVariable } from './actions/runtime';
import { logUserIn } from './actions/user';
import { port, auth } from './config';
import cache from './core/cache';

import models, {
  User as UserModel,
  Timetable as TimetableModel,
  TimetableModule as TimetableModuleModel,
  Module as ModuleModel,
  TeamUser as TeamUserModel,
  Team as TeamModel,
  Semtime as SemtimeModel,
} from './data/models';

const app = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Authentication
// -----------------------------------------------------------------------------
app.use(expressJwt({
  secret: auth.jwt.secret,
  credentialsRequired: false,
  getToken: req => req.cookies.id_token,
}));
app.use(passport.initialize());

app.get('/login/facebook',
  passport.authenticate('facebook', { scope: ['email', 'user_location'], session: false })
);
app.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const expiresIn = 60 * 60 * 24 * 180; // 180 days
    const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('/');
  }
);

app.post('/logout', (req, res) => {
  req.logout();
  res.clearCookie('id_token', { httpOnly: true });
  res.json({});
});

// APIs

app.route('/api/:year/:semester/team')
.get((req, res) => {
  const userId = req.user.id;
  const year = req.params.year;
  const semester = req.params.semester;
  TeamUserModel.findAll({
    where: {
      userId,
    },
    include: [{
      model: TeamModel,
      as: 'team',
      where: {
        year,
        semester,
      },
      include: [{
        model: TeamUserModel,
        as: 'users',
        include: [{
          model: UserModel,
          as: 'user',
        }],
      }, {
        model: UserModel,
        as: 'creator',
      }],
    }],
  }).then((result) => {
    const finalResult = [];
    for (let i = 0; i < result.length; ++i) {
      const members = [];
      for (let j = 0; j < result[i].team.users.length; ++j) {
        members.push({
          userId: result[i].team.users[j].userId,
          name: result[i].team.users[j].user.name,
          acceptInvitation: result[i].team.users[j].acceptInvitation,
        });
      }
      finalResult.push({
        createdBy: {
          userId: result[i].team.creator.id,
          name: result[i].team.creator.name,
        },
        teamId: result[i].teamId,
        teamName: result[i].team.name,
        members,
      });
    }
    res.json(finalResult);
  });
})
.post((req, res) => {
  const userId = req.user.id;
  const year = req.params.year;
  const semester = req.params.semester;
  const name = req.body.name;
  TeamModel.create({
    createdBy: userId,
    year,
    semester,
    name,
  }).then((newTeam) => {
    TeamUserModel.create({
      userId,
      teamId: newTeam.dataValues.id,
      acceptInvitation: 1, // Creator of Team is automatically invited and accepted
    }).then(() => {
      UserModel.find({
        where: {
          id: userId,
        },
      }).then((creator) => {
        res.status(201);
        res.json({
          createdBy: {
            userId,
            name: creator.name,
          },
          teamId: newTeam.dataValues.id,
          teamName: newTeam.dataValues.name,
          members: [{
            userId,
            name: creator.name,
            acceptInvitation: 1,
          }],
        });
      });
    });
  });
});

function addOneTime(oldTime) {
  switch (oldTime) {
    case '0600':
      return '0630';
    case '0630':
      return '0700';
    case '0700':
      return '0730';
    case '0730':
      return '0800';
    case '0800':
      return '0830';
    case '0830':
      return '0900';
    case '0900':
      return '0930';
    case '0930':
      return '1000';
    case '1000':
      return '1030';
    case '1030':
      return '1100';
    case '1100':
      return '1130';
    case '1130':
      return '1200';
    case '1200':
      return '1230';
    case '1230':
      return '1300';
    case '1300':
      return '1330';
    case '1330':
      return '1400';
    case '1400':
      return '1430';
    case '1430':
      return '1500';
    case '1500':
      return '1530';
    case '1530':
      return '1600';
    case '1600':
      return '1630';
    case '1630':
      return '1700';
    case '1700':
      return '1730';
    case '1730':
      return '1800';
    case '1800':
      return '1830';
    case '1830':
      return '1900';
    case '1900':
      return '1930';
    case '1930':
      return '2000';
    case '2000':
      return '2030';
    case '2030':
      return '2100';
    case '2100':
      return '2130';
    case '2130':
      return '2200';
    case '2200':
      return '2230';
    case '2230':
      return '2300';
    case '2300':
      return '2330';
    case '2330':
      return '2359';
    default:
      return '0600';
  }
}

app.route('/api/team/:id')
.get((req, res) => {
  const userId = req.user.id;
  const teamId = req.params.id;
  const date = req.query.date;
  if (!date) {
    res.status(400);
    res.json({
      error: 'Please specify a date query.',
    });
  } else {
    SemtimeModel.find({
      where: {
        startDate: {
          $lte: date,
        },
        endDate: {
          $gte: date,
        },
      },
    }).then((dateResult) => {
      if (!dateResult) {
        res.status(400);
        res.json({
          error: 'Please specify a date query within the semester in which the group is formed.',
        });
      } else if (dateResult.weekType === 0) {
        res.json({
          holiday: dateResult.name,
        });
      } else {
        const dow = moment(date).format('dddd');
        TeamModel.find({
          where: {
            id: teamId,
          },
        }).then((oneTeam) => {
          TeamModel.find({
            where: {
              id: teamId,
              year: dateResult.year,
              semester: dateResult.semester,
            },
            include: [{
              model: TeamUserModel,
              as: 'users',
              include: [{
                model: UserModel,
                as: 'user',
                include: [{
                  model: TimetableModel,
                  as: 'timetables',
                  where: {
                    year: oneTeam.year,
                    semester: oneTeam.semester,
                  },
                  include: [{
                    model: TimetableModuleModel,
                    as: 'timetableModules',
                    include: [{
                      model: ModuleModel,
                      as: 'module',
                    }],
                  }],
                }],
              }],
            }, {
              model: UserModel,
              as: 'creator',
            }],
          }).then((result) => {
            if (!result) {
              res.status(400);
              res.json({
                error: 'Please specify a date query within ' +
                'the semester in which the group is formed.',
              });
            } else {
              // Shows even if invitation has not been accepted
              const freeTime = ['0600', '0630', '0700', '0730', '0800', '0830',
              '0900', '0930', '1000', '1030', '1100', '1130', '1200', '1230',
              '1300', '1330', '1400', '1430', '1500', '1530', '1600', '1630',
              '1700', '1730', '1800', '1830', '1900', '1930', '2000', '2030',
              '2100', '2130', '2200', '2230', '2300', '2330'];
              let show = false;
              const members = [];
              for (let j = 0; j < result.users.length; ++j) {
                if (userId === result.users[j].userId && result.users[j].acceptInvitation) {
                  show = true;
                }
                const oneTimetable = result.users[j].user.timetables[0].timetableModules;
                const finalTimetable = [];
                for (let k = 0; k < oneTimetable.length; ++k) {
                  const lessonType = oneTimetable[k].lessonType.toString();
                  const classNumber = oneTimetable[k].classNumber.toString();
                  const oneModuleTimetable = JSON.parse(oneTimetable[k].module.timetable);
                  for (let m = 0; m < oneModuleTimetable.length; ++m) {
                    if (oneModuleTimetable[m].ClassNo === classNumber
                      && oneModuleTimetable[m].LessonType === lessonType
                      && oneModuleTimetable[m].DayText === dow
                      && (
                        (oneModuleTimetable[m].WeekText === 'Every Week'
                          && dateResult.weekType !== 0)
                        || (oneModuleTimetable[m].WeekText === 'Odd Week'
                          && dateResult.weekType === 1)
                        || (oneModuleTimetable[m].WeekText === 'Even Week'
                          && dateResult.weekType === 2))) {
                      oneTimetable[k].module.timetable = oneModuleTimetable[m];
                      finalTimetable.push(oneTimetable[k]);
                      let startTime = oneModuleTimetable[m].StartTime;
                      const endTime = oneModuleTimetable[m].EndTime;
                      while (startTime !== '2359' && startTime !== endTime) {
                        const index = freeTime.indexOf(startTime);
                        if (index > -1) {
                          freeTime.splice(index, 1);
                        }
                        startTime = addOneTime(startTime);
                      }
                      break;
                    }
                  }
                }
                members.push({
                  userId: result.users[j].userId,
                  name: result.users[j].user.name,
                  acceptInvitation: result.users[j].acceptInvitation,
                  timetable: result.users[j].acceptInvitation ? finalTimetable : [],
                });
              }
              if (show) {
                let freeTimeMessage = 'Free Time Slots: ';
                let startTimeSlot = true;
                for (let k = 0; k < freeTime.length; ++k) {
                  if (startTimeSlot) {
                    startTimeSlot = false;
                    freeTimeMessage += freeTime[k];
                    freeTimeMessage += ' to ';
                  } else if (addOneTime(freeTime[k - 1]) !== freeTime[k]) {
                    freeTimeMessage += addOneTime(freeTime[k - 1]);
                    freeTimeMessage += ' | ';
                    freeTimeMessage += freeTime[k];
                    freeTimeMessage += ' to ';
                  }
                }
                freeTimeMessage += addOneTime(freeTime[freeTime.length - 1]);
                res.json({
                  freeTimeMessage,
                  createdBy: {
                    userId: result.creator.id,
                    name: result.creator.name,
                  },
                  year: result.year,
                  semester: result.semester,
                  teamId: result.id,
                  teamName: result.name,
                  members,
                });
              } else {
                res.json({});
              }
            }
          });
        });
      }
    });
  }
})
.post((req, res) => {
  const userId = req.user.id;
  const teamId = req.params.id;
  const newTeamName = req.body.name;
  const usersToAdd = (req.body.members && req.body.members.map(u => u.userId || u.id)) || [];
  TeamModel.find({
    where: {
      id: teamId,
    },
    include: [{
      model: TeamUserModel,
      as: 'users',
      include: [{
        model: UserModel,
        as: 'user',
      }],
    }, {
      model: UserModel,
      as: 'creator',
    }],
  }).then((result) => {
    if (result.name !== newTeamName) {
      result.update({
        name: newTeamName,
      });
    }
    const isMember = !!result.users.find(u => u.userId === userId && u.acceptInvitation);
    const newMembers = usersToAdd.filter(uid => !result.users.find(u => u.userId === uid));
    if (isMember) {
      const addedMembers = [];
      // TODO: THIS SHOULD BE CHANGED TO 0 ONCE INVITATION IS IMPLEMENTED
      const acceptInvitation = 1;
      UserModel.findAll({
        where: {
          id: newMembers,
        },
      }).then((allNewUsers) => {
        for (let j = 0; j < allNewUsers.length; ++j) {
          TeamUserModel.create({
            userId: allNewUsers[j].id,
            teamId,
            acceptInvitation, // Invitation not accepted yet
          });
          // Create timetable for user if not exist
          TimetableModel.find({
            where: {
              userId: allNewUsers[j].id,
              year: result.year,
              semester: result.semester,
            },
          }).then((aTimetable) => {
            if (!aTimetable) { // if user timetable does not exist, create one.
              TimetableModel.create({
                userId: allNewUsers[j].id,
                year: result.year,
                semester: result.semester,
              });
            }
          });
          addedMembers.push({
            userId: allNewUsers[j].id,
            name: allNewUsers[j].name,
            acceptInvitation,
          });
        }
        res.status(201);
        res.json({
          createdBy: {
            userId: result.creator.id,
            name: result.creator.name,
          },
          year: result.year,
          semester: result.semester,
          teamId: result.id,
          teamName: result.name,
          addedMembers,
        });
      }).catch(e => res.status(404).send(e));
    } else {
      res.json({});
    }
  }).catch((e) => {
    console.log(e); // eslint-disable-line no-console
    res.status(404).send(e);
  });
})
.put((req, res) => {
  const userId = req.user.id;
  const teamId = req.params.id;
  TeamUserModel.find({
    where: {
      teamId,
      userId,
    },
  }).then((result) => {
    if (result) {
      const acceptInvitation = 1;
      result.update({
        acceptInvitation,
      });
      res.json({
        userId,
        teamId,
        acceptInvitation,
      });
    } else {
      res.json({});
    }
  });
})
.delete((req, res) => {
  const userId = req.user.id;
  const teamId = req.params.id;
  TeamUserModel.find({
    where: {
      teamId,
      userId,
    },
  }).then((result) => {
    if (result) {
      result.destroy();
      // TODO: delete group too if no more users in team
      res.json({
        destroy: true,
      });
    } else {
      res.json({
        destroy: false,
      });
    }
  });
});

function updateTimetable(timetableId, year, semester, allNewMods) {
  // remove all timetable mod that is not in the new mods
  TimetableModuleModel.findAll({
    where: {
      timetableId,
    },
    include: {
      model: ModuleModel,
      as: 'module',
    },
  }).then(tts => {
    tts.forEach(tm => {
      if (!allNewMods.map(m => m.ModuleCode).includes(tm.module.code)) {
        tm.destroy();
      }
    });
  });
  for (let i = 0; i < allNewMods.length; ++i) {
    // the frontend uses nusmods naming convention for displaying
    // we reuse it here for simplicity, this might change in the future
    const code = allNewMods[i].ModuleCode;
    const lessonType = allNewMods[i].LessonType;
    const classNumber = allNewMods[i].ClassNo;
    // Find Module Id
    ModuleModel.find({
      where: {
        year,
        semester,
        code,
      },
    }).then((mod) => {
      if (mod) {
        TimetableModuleModel.find({
          where: {
            timetableId,
            moduleId: mod.dataValues.id,
            lessonType,
          },
        }).then((oldMod) => {
          if (oldMod) { // TimetableModule already exists. Update.
            oldMod.update({
              classNumber,
            });
          } else { // TimetableModule does not exist. Create.
            TimetableModuleModel.create({
              timetableId,
              moduleId: mod.dataValues.id,
              lessonType,
              classNumber,
            });
          }
        });
      }
    });
  }
}

app.route('/api/:year/:semester/timetable')
.get((req, res) => {
  const userId = req.user.id;
  const year = req.params.year;
  const semester = req.params.semester;
  TimetableModel.find({
    where: {
      userId,
      year,
      semester,
    },
    include: [{
      model: TimetableModuleModel,
      as: 'timetableModules',
      include: [{
        model: ModuleModel,
        as: 'module',
      }],
    }],
  }).then((result) => {
    res.json(result || {});
  });
})
.post((req, res) => {
  const userId = req.user.id; // TO CHANGE
  const year = req.params.year;
  const semester = req.params.semester;
  const allNewMods = req.body;
  TimetableModel.find({
    where: {
      userId,
      year,
      semester,
    },
  }).then((myTimetable) => {
    if (!myTimetable) { // if my timetable does not exist, create one.
      TimetableModel.create({
        userId,
        year,
        semester,
      }).then((newTimetable) => {
        updateTimetable(newTimetable.dataValues.id, year, semester, allNewMods);
        res.status(201);
        res.json({});
      });
    } else {
      console.log(myTimetable.dataValues.id); // eslint-disable-line no-console
      updateTimetable(myTimetable.dataValues.id, year, semester, allNewMods);
      res.status(201);
      res.json({});
    }
  });
});

app.route('/api/:year/:semester/friends')
.get((req, res) => {
  const userId = req.user.id;
  const year = req.params.year;
  const semester = req.params.semester;
  TimetableModel.findAll({
    where: {
      userId: {
        $ne: userId,
      },
      year,
      semester,
    },
    include: [{
      model: UserModel,
      as: 'user',
    }],
  }).then((result) => {
    const myFriends = [];
    for (let i = 0; i < result.length; ++i) {
      if (result[i].user) {
        myFriends.push({
          name: result[i].user.name,
          id: result[i].user.id,
        });
      }
    }
    res.json(myFriends);
  });
  // Uncomment to implement find friends who take same module(s)
  // TimetableModel.find({
  //   where: {
  //     userId,
  //     year,
  //     semester,
  //   },
  //   include: [{
  //     model: TimetableModuleModel,
  //     as: 'timetableModules',
  //   }],
  // }).then((result) => {
  //   if (!result) {
  //     TimetableModel.create({
  //       userId,
  //       year,
  //       semester,
  //     }).then(() => {
  //       res.json({});
  //     });
  //   } else {
  //     const myMods = [];
  //     for (let i = 0; i < result.timetableModules.length; ++i) {
  //       myMods.push(result.timetableModules[i].moduleId);
  //     }
  //     ModuleModel.findAll({
  //       attributes: ['id'],
  //       where: {
  //         id: myMods,
  //       },
  //       include: [{
  //         model: TimetableModuleModel,
  //         as: 'timetableModules',
  //         include: [{
  //           model: TimetableModel,
  //           as: 'timetable',
  //         }],
  //       }],
  //     }).then((allFriends) => {
  //       const myFriends = [];
  //       for (let i = 0; i < allFriends.length; ++i) {
  //         for (let j = 0; j < allFriends[i].timetableModules.length; ++j) {
  //           if (allFriends[i].timetableModules[j].timetable.userId !== userId) {
  //             myFriends.push(allFriends[i].timetableModules[j].timetable.userId);
  //           }
  //         }
  //       }
  //       UserModel.findAll({
  //         attributes: ['id', 'name'],
  //         where: {
  //           id: myFriends,
  //         },
  //       }).then((myFriendsNames) => {
  //         res.json(myFriendsNames);
  //       });
  //     });
  //   }
  // });
});

//
// Register API middleware
// -----------------------------------------------------------------------------
app.use('/graphql', cache(60 * 60), expressGraphQL(req => ({
  schema,
  graphiql: true,
  rootValue: { request: req },
  pretty: process.env.NODE_ENV !== 'production',
})));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  const history = createHistory(req.url);
  // let currentLocation = history.getCurrentLocation();
  let sent = false;
  const removeHistoryListener = history.listen(location => {
    const newUrl = `${location.pathname}${location.search}`;
    if (req.originalUrl !== newUrl) {
      // console.log(`R ${req.originalUrl} -> ${newUrl}`); // eslint-disable-line no-console
      if (!sent) {
        res.redirect(303, newUrl);
        sent = true;
        next();
      } else {
        console.error(`${req.path}: Already sent!`); // eslint-disable-line no-console
      }
    }
  });

  try {
    const store = configureStore({}, {
      cookie: req.headers.cookie,
      history,
    });

    store.dispatch(setRuntimeVariable({
      name: 'initialNow',
      value: Date.now(),
    }));

    if (req.user) {
      store.dispatch(logUserIn({
        user: req.user,
      }));
    }

    let css = new Set();
    let statusCode = 200;
    const data = { title: '', description: '', style: '', script: assets.main.js, children: '' };

    await UniversalRouter.resolve(routes, {
      path: req.path,
      query: req.query,
      context: {
        store,
        createHref: history.createHref,
        insertCss: (...styles) => {
          styles.forEach(style => css.add(style._getCss())); // eslint-disable-line no-underscore-dangle, max-len
        },
        setTitle: value => (data.title = value),
        setMeta: (key, value) => (data[key] = value),
      },
      render(component, status = 200) {
        css = new Set();
        statusCode = status;
        data.children = ReactDOM.renderToString(component);
        data.state = store.getState();
        data.style = [...css].join('');
        return true;
      },
    });

    if (!sent) {
      const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
      res.status(statusCode);
      res.send(`<!doctype html>${html}`);
    }
  } catch (err) {
    next(err);
  } finally {
    removeHistoryListener();
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const statusCode = err.status || 500;
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      style={errorPageStyle._getCss()} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>
  );
  res.status(statusCode);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
/* eslint-disable no-console */
models.sync().catch(err => console.error(err.stack)).then(() => {
  app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}/`);
  });
});
/* eslint-enable no-console */
