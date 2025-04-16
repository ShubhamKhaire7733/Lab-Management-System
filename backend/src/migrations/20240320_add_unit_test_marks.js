'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('assessments', 'unitTest1Marks', {
      type: Sequelize.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 30
      }
    });

    await queryInterface.addColumn('assessments', 'unitTest2Marks', {
      type: Sequelize.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 30
      }
    });

    await queryInterface.addColumn('assessments', 'unitTest3Marks', {
      type: Sequelize.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 30
      }
    });

    await queryInterface.addColumn('assessments', 'convertedUnitTestMarks', {
      type: Sequelize.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        max: 20
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('assessments', 'unitTest1Marks');
    await queryInterface.removeColumn('assessments', 'unitTest2Marks');
    await queryInterface.removeColumn('assessments', 'unitTest3Marks');
    await queryInterface.removeColumn('assessments', 'convertedUnitTestMarks');
  }
}; 