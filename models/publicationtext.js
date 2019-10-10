'use strict';
module.exports = (sequelize, DataTypes) => {
  const PublicationText = sequelize.define('PublicationText', {
    languageId: DataTypes.NUMBER,
    publicationId: DataTypes.NUMBER,
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    digest: DataTypes.STRING
  }, {
      tableName: 'publictxts',
      timestamps: false
    });
  PublicationText.associate = function (models) {
    // associations can be defined here
  };
  return PublicationText;
};