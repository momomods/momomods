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

  timetable_id: {
    type: DataType.INTEGER,
  },

  module_id: {
    type: DataType.INTEGER,
  },

  lessonType: {
    type: DataType.STRING(255),
  },

  classNumber: {
    type: DataType.INTEGER,
    defaultValue: 1,
  },

});

export default TimetableModule;