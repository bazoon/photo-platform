'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RegistrationContests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      contestId: {
        type: Sequelize.INTEGER
      },
      dateReg: {
        type: Sequelize.DATE
      },
      sectionCount: {
        type: Sequelize.INTEGER
      },
      regState: {
        type: Sequelize.INTEGER
      },
      rejectReason: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('RegistrationContests');
  }
};