'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lexicon = sequelize.define('Lexicon', {
    languageId: DataTypes.INTEGER,
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    category: DataTypes.INTEGER
  }, {
      timestamps: false
    });
  Lexicon.associate = function (models) {
    // associations can be defined here
  };
  return Lexicon;
};