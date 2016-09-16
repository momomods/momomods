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

const Team = Model.define('Team', {

  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },

  year: {
    type: DataType.STRING(45),
    allowNull: false,
  },

  semester: {
    type: DataType.INTEGER,
    allowNull: false,
  },

  name: {
    type: DataType.STRING(255),
    allowNull: false,
  },

  createdBy: {
    type: DataType.INTEGER,
    allowNull: false,
  },

});

export default Team;
