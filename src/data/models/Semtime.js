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

const Semtime = Model.define('Semtime', {

  year: {
    type: DataType.STRING(45),
    primaryKey: true,
  },

  semester: {
    type: DataType.INTEGER,
    primaryKey: true,
  },

  name: {
    type: DataType.STRING(255),
    primaryKey: true,
  },

  startDate: {
    type: DataType.DATEONLY,
    allowNull: false,
  },

  endDate: {
    type: DataType.DATEONLY(),
    allowNull: false,
  },

  weekType: {
    type: DataType.INTEGER(3),
    allowNull: false,
  },

});

export default Semtime;
