module.exports = {
    up: async (queryInterface, Sequelize) => {
        queryInterface.addColumn('Quizzes', 'userId', {
            type: Sequelize.UUID
        });
    },

    down: async (queryInterface) => {
        queryInterface.removeColumn('Quizzes', 'userId');
    },
};
