'use strict';
module.exports = (sequelize, DataTypes) => {
  const Phrase = sequelize.define('Phrase', {
    lexiconId: DataTypes.NUMBER,
    languageId: DataTypes.NUMBER,
    name: DataTypes.STRING
  }, {
      timestamps: false
    });
  Phrase.associate = function (models) {
    // associations can be defined here
  };
  return Phrase;
};