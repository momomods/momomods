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

const Timetable = Model.define('Timetable', {

  id: {
    type: DataType.INTEGER,
    primaryKey: true,
  },

  user_id: {
    type: DataType.INTEGER,
  },

  year: {
    type: DataType.INTEGER,
  },

  semester: {
    type: DataType.INTEGER,
  },

});

export default Timetable;