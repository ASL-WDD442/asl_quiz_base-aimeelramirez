'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Users.init({
    username: DataTypes.STRING,
    access_token: DataTypes.STRING,
    password: DataTypes.STRING,
    type: DataTypes.ENUM('type1', 'type2')
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};