'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lexicon = sequelize.define('Lexicon', {
    code: DataTypes.STRING,
    category: DataTypes.INTEGER,
    commentPhrase: DataTypes.STRING
  }, {
      timestamps: false
    });
  Lexicon.associate = function (models) {
    // associations can be defined here
  };
  return Lexicon;
};