'use strict';
module.exports = (sequelize, DataTypes) => {
  const ContestMenu = sequelize.define('ContestMenu', {
    contestId: DataTypes.INTEGER,
    position: DataTypes.INTEGER,
    parentId: DataTypes.INTEGER
  }, {
      timestamps: false
    });
  ContestMenu.associate = function (models) {
    // associations can be defined here
  };
  return ContestMenu;
};