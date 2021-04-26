'use strict';
module.exports = (sequelize, DataTypes) => {
  const ContestAbout = sequelize.define('ContestAbout', {
    languageId: DataTypes.INTEGER,
    contestId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    thesis: DataTypes.STRING,
    rules: DataTypes.STRING
  }, {
      timestamps: false
    });
  ContestAbout.associate = function (models) {
    // associations can be defined here
  };
  return ContestAbout;
};