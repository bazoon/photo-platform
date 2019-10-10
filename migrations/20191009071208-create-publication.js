'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Publications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      contestMenuId: {
        type: Sequelize.NUMBER
      },
      dateCreate: {
        type: Sequelize.DATE
      },
      dateShow: {
        type: Sequelize.DATE
      },
      visible: {
        type: Sequelize.NUMBER
      },
      pubtype: {
        type: Sequelize.NUMBER
      },
      archive: {
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
    return queryInterface.dropTable('Publications');
  }
};