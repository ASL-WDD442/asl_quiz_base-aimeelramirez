'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Choices extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   Choices.init({
//     value: DataTypes.STRING,
//     type: DataTypes.ENUM('correct', 'incorrect')
//   }, {
//     sequelize,
//     modelName: 'Choices',
//   });
//   return Choices;
// };
module.exports = (sequelize, DataTypes) => {
  const Choices = sequelize.define('Choices', {
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
    value: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [2, 50],
          msg: 'Choice value is required.',
        },
      },
    },
    type: {
      type: DataTypes.ENUM('correct', 'incorrect'),
      validate: {
        isIn: {
          args: [['correct', 'incorrect']],
          msg: 'Choice must be either correct or incorrect.',
        },
      },
    },
    questionId: {
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Questions',
        key: 'id',
      },
      validate: {
        isUUID: {
          args: 4,
          msg: 'Question ID is not valid. Please try again.',
        },
      },
    },
  }, {});
  Choices.associate = (models) => {
    Choices.belongsTo(models.Questions, { foreignKey: 'questionId' });
  };
  return Choices;
};
