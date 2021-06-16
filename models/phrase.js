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
    Phrase.belongsTo(models.Language, {
      foreignKey: 'language_id'
    });
    models.Language.hasMany(Phrase);
  };
  return Phrase;
};
