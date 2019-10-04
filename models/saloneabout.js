'use strict';
module.exports = (sequelize, DataTypes) => {
  const SaloneAbout = sequelize.define('SaloneAbout', {
    languageId: DataTypes.INTEGER,
    saloneId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
      timestamps: false
    });
  SaloneAbout.associate = function (models) {
    // associations can be defined here
  };
  return SaloneAbout;
};