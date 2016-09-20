import DataType from 'sequelize';
import Model from '../sequelize';

const UserProfile = Model.define('UserProfile', {

  userId: {
    type: DataType.INTEGER,
    primaryKey: true,
  },

  picture: {
    type: DataType.STRING(255),
  },

  gender: {
    type: DataType.STRING(50),
  },

  location: {
    type: DataType.STRING(100),
  },

});

export default UserProfile;
