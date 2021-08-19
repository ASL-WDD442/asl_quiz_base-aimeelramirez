'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
      validate: {
        isUUID: {
          args: 4,
          msg: 'ID is not valid. Please try again.',
        },
      },
    },
    username: {
      type: Sequelize.STRING,
      unique: {
        args: true,
        msg: 'Username is already in use.',
      },
      allowNull: {
        args: false,
        msg: 'Username is required.',
      },
    },
    access_token: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    type: {
      type: Sequelize.ENUM('type1', 'type2')
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {});
  Users.associate = (models) => {
    Users.hasMany(models.Quizzes, { foreignKey: 'userId' });
  };

  return Users;
};
