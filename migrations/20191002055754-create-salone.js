'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Salones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spr_salone_type_id: {
        type: Sequelize.INTEGER
      },
      organizer_id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      regular: {
        type: Sequelize.INTEGER
      },
      private: {
        type: Sequelize.INTEGER
      },
      domen: {
        type: Sequelize.STRING
      },
      design_code: {
        type: Sequelize.STRING
      },
      row_state: {
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
    return queryInterface.dropTable('Salones');
  }
};