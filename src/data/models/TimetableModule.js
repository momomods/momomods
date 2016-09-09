/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import DataType from 'sequelize';
import Model from '../sequelize';

const TimetableModule = Model.define('TimetableModule', {

  id: {
    type: DataType.INTEGER,
    primaryKey: true,
  },

  timetableId: {
    type: DataType.INTEGER,
    unique: 'oneTimetableModule',
  },

  moduleId: {
    type: DataType.INTEGER,
    unique: 'oneTimetableModule',
  },

  lessonType: {
    type: DataType.STRING(255),
    unique: 'oneTimetableModule',
  },

  classNumber: {
    type: DataType.INTEGER,
    defaultValue: 1,
  },

});

export default TimetableModule;
