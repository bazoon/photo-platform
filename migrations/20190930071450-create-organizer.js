'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Organizers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      languageId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      emailSys: {
        type: Sequelize.STRING
      },
      emailPub: {
        type: Sequelize.STRING
      },
      addressLine1: {
        type: Sequelize.STRING
      },
      addressLine2: {
        type: Sequelize.STRING
      },
      www: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      phoneTech: {
        type: Sequelize.STRING
      },
      officer: {
        type: Sequelize.STRING
      },
      logo: {
        type: Sequelize.STRING
      },
      virtual: {
        type: Sequelize.INTEGER
      },
      smtp: {
        type: Sequelize.STRING
      },
      smtpPassword: {
        type: Sequelize.STRING
      },
      smtpUsePub: {
        type: Sequelize.INTEGER
      },
      dateCreate: {
        type: Sequelize.DATE
      },
      rowState: {
        type: Sequelize.INTEGER
      },
      dateStatus: {
        type: Sequelize.DATE
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
    return queryInterface.dropTable('Organizers');
  }
};