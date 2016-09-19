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

import models, {
  User as UserModel,
  Timetable as TimetableModel,
  TimetableModule as TimetableModuleModel,
  Module as ModuleModel,
  TeamUser as TeamUserModel,
  Team as TeamModel,
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
    let finalResult = [];
    for (let i = 0; i < result.length; ++i) {
      let members = [];
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
  const name = req.body[0].teamName;
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
    }).then((newTeamUser) => {
      UserModel.find({
        where: {
          id: userId,
        },
      }).then((creator) => {
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

app.route('/api/team/:id')
.get((req, res) => {
  const userId = req.user.id;
  const teamId = req.params.id;
  TeamModel.find({
    where: {
      id: teamId,
    },
  }).then((oneTeam) => {
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
      // Shows even if invitation has not been accepted
      let show = false;
      let members = [];
      for (let j = 0; j < result.users.length; ++j) {
        if (userId === result.users[j].userId && result.users[j].acceptInvitation) {
          show = true;
        }
        members.push({
          userId: result.users[j].userId,
          name: result.users[j].user.name,
          acceptInvitation: result.users[j].acceptInvitation,
          timetable: result.users[j].acceptInvitation ? result.users[j].user.timetables[0].timetableModules : [],
        });
      }
      if (show) {
        res.json({
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
    });
  });
})
.post((req, res) => {
  const userId = req.user.id;
  const teamId = req.params.id;
  const usersToAdd = req.body;
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
    let member = false;
    for (let j = 0; j < result.users.length; ++j) {
      if (userId === result.users[j].userId && result.users[j].acceptInvitation) {
        member = true;
      }
      const index = usersToAdd.indexOf(result.users[j].userId.toString());
      if (index > -1) {
        usersToAdd.splice(index, 1);
      }
    }
    if (member) {
      let addedMembers = [];
      const acceptInvitation = 0;
      UserModel.findAll({
        where: {
          id: usersToAdd,
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
              })
            };
          });
          addedMembers.push({
            userId: allNewUsers[j].id,
            name: allNewUsers[j].name,
            acceptInvitation,
          });
        }
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
      });
    } else {
      res.json({});
    }
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
    tts.map(tm => {
      if (!allNewMods.map(m => m.ModuleCode).includes(tm.code)) {
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
    result = result || {};
    res.json(result);
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
        res.json({});
      });
    } else {
      console.log(myTimetable.dataValues.id); // eslint-disable-line no-console
      updateTimetable(myTimetable.dataValues.id, year, semester, allNewMods);
      res.json({});
    }
  });
});

app.route('/api/:year/:semester/friends')
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
    }],
  }).then((result) => {
    let myMods = [];
    for (let i = 0; i < result.timetableModules.length; ++i) {
      myMods.push(result.timetableModules[i].moduleId);
    }
    ModuleModel.findAll({
      attributes: ['id'],
      where: {
        id: myMods,
      },
      include: [{
        model: TimetableModuleModel,
        as: 'timetableModules',
        include: [{
          model: TimetableModel,
          as: 'timetable',
        }],
      }],
    }).then((allFriends) => {
      let myFriends = [];
      for (let i = 0; i < allFriends.length; ++i) {
        for (let j = 0; j < allFriends[i].timetableModules.length; ++j) {
          if (allFriends[i].timetableModules[j].timetable.userId !== userId) {
            myFriends.push(allFriends[i].timetableModules[j].timetable.userId);
          }
        }
      }
      UserModel.findAll({
        attributes: ['id', 'name'],
        where: {
          id: myFriends,
        },
      }).then((myFriendsNames) => {
        res.json(myFriendsNames);
      })
    });
  });
});
//
// Register API middleware
// -----------------------------------------------------------------------------
app.use('/graphql', expressGraphQL(req => ({
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
