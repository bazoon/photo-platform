'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Photoworks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      registrationContestId: {
        type: Sequelize.INTEGER
      },
      sectionId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      filename: {
        type: Sequelize.STRING
      },
      moder: {
        type: Sequelize.INTEGER
      },
      reasonModeration: {
        type: Sequelize.STRING
      },
      dateAdd: {
        type: Sequelize.DATE
      },
      average: {
        type: Sequelize.DOUBLE
      },
      mediane: {
        type: Sequelize.DOUBLE
      },
      demosRate: {
        type: Sequelize.DOUBLE
      },
      yearShot: {
        type: Sequelize.STRING
      },
      locateShot: {
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
    return queryInterface.dropTable('Photoworks');
  }
};