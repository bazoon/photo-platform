'use strict';
module.exports = (sequelize, DataTypes) => {
  const PubMenu = sequelize.define('PubMenu', {
    contestMenuId: DataTypes.NUMBER,
    lexiconId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
  }, {
      timestamps: false
    });
  PubMenu.associate = function (models) {
    // associations can be defined here
  };
  return PubMenu;
};