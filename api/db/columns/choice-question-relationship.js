module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Choices', 'questionId', {
      type: Sequelize.UUID
    });
  },

  down: async (queryInterface) => {
    queryInterface.removeColumn('Choices', 'questionId');
  },
};
