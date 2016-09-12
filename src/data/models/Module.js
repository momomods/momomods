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

const Module = Model.define('Module', {

  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },

  year: {
    type: DataType.STRING(45),
    unique: 'oneModule',
  },

  semester: {
    type: DataType.INTEGER,
    unique: 'oneModule',
  },

  code: {
    type: DataType.STRING(45),
    unique: 'oneModule',
  },

  title: {
    type: DataType.STRING(255),
  },

  description: {
    type: DataType.TEXT('medium'),
  },

  department: {
    type: DataType.STRING(255),
  },

  credit: {
    type: DataType.INTEGER,
  },

  workload: {
    type: DataType.STRING(255),
  },

  prerequisite: {
    type: DataType.TEXT('medium'),
  },

  preclusion: {
    type: DataType.TEXT('medium'),
  },

  examDate: {
    type: DataType.DATE,
  },

  timetable: {
    type: DataType.TEXT('medium'),
  },

});

export default Module;
