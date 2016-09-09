/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import sequelize from '../sequelize';
import User from './User';
import Timetable from './Timetable';
import TimetableModule from './TimetableModule';
import Module from './Module';

// User.hasMany(UserLogin, {
//   foreignKey: 'userId',
//   as: 'logins',
//   onUpdate: 'cascade',
//   onDelete: 'cascade',
// });

// User.hasMany(UserClaim, {
//   foreignKey: 'userId',
//   as: 'claims',
//   onUpdate: 'cascade',
//   onDelete: 'cascade',
// });

// User.hasOne(UserProfile, {
//   foreignKey: 'userId',
//   as: 'profile',
//   onUpdate: 'cascade',
//   onDelete: 'cascade',
// });

User.hasMany(Timetable, {
  foreignKey: 'userId',
  as: 'timetables',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});

Timetable.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
  targetKey: 'id',
  onUpdate: 'NO ACTION',
  onDelete: 'NO ACTION',
});

Timetable.hasMany(TimetableModule, {
  foreignKey: 'timetableId',
  as: 'timetableModules',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});

TimetableModule.belongsTo(Timetable, {
  foreignKey: 'timetableId',
  as: 'timetable',
  targetKey: 'id',
  onUpdate: 'NO ACTION',
  onDelete: 'NO ACTION',
});

TimetableModule.belongsTo(Module, {
  foreignKey: 'moduleId',
  as: 'module',
  targetKey: 'id',
  onUpdate: 'NO ACTION',
  onDelete: 'NO ACTION',
});

Module.hasMany(TimetableModule, {
  foreignKey: 'moduleId',
  as: 'timetableModules',
  onUpdate: 'NO ACTION',
  onDelete: 'NO ACTION',
});

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { User, Timetable, TimetableModule, Module };
