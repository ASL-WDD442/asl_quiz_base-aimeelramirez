module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Questions', 'quizId', {
      type: Sequelize.UUID
    });
  },

  down: async (queryInterface) => {
    queryInterface.removeColumn('Questions', 'quizId');
  },
};
