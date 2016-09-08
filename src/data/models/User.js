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

const User = Model.define('User', {

  id: {
    type: DataType.INTEGER,
    defaultValue: 0,
    primaryKey: true,
  },

  name: {
    type: DataType.STRING(255),
    defaultValue: "User",
  },

  email: {
    type: DataType.STRING(255),
  },

  emailConfirmed: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },

});

export default User;
