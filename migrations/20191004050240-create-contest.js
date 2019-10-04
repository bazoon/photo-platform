'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Contests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      soloneId: {
        type: Sequelize.NUMBER
      },
      subname: {
        type: Sequelize.STRING
      },
      years: {
        type: Sequelize.STRING
      },
      dateStart: {
        type: Sequelize.DATE
      },
      dateStop: {
        type: Sequelize.DATE
      },
      dateJuryEnd: {
        type: Sequelize.DATE
      },
      dateRateShow: {
        type: Sequelize.DATE
      },
      showType: {
        type: Sequelize.NUMBER
      },
      showRateState: {
        type: Sequelize.NUMBER
      },
      democraty: {
        type: Sequelize.NUMBER
      },
      payType: {
        type: Sequelize.NUMBER
      },
      sectionCount: {
        type: Sequelize.NUMBER
      },
      maxrate: {
        type: Sequelize.NUMBER
      },
      maxsize: {
        type: Sequelize.NUMBER
      },
      maxWeight: {
        type: Sequelize.NUMBER
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
    return queryInterface.dropTable('Contests');
  }
};