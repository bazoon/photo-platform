'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PublicationTexts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      languageId: {
        type: Sequelize.NUMBER
      },
      publicationId: {
        type: Sequelize.NUMBER
      },
      name: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      digest: {
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
    return queryInterface.dropTable('PublicationTexts');
  }
};