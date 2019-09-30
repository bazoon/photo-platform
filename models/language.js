'use strict';
module.exports = (sequelize, DataTypes) => {
  const Language = sequelize.define('Language', {
    name: DataTypes.STRING,
    nameDialect: DataTypes.STRING,
    short: DataTypes.STRING
  }, {
      timestamps: false,
    });
  Language.associate = function (models) {
    Language.hasMany(models.Organizer);
  };
  return Language;
};