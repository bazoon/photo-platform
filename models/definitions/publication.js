'use strict';
module.exports = (sequelize, DataTypes) => {
  const Publication = sequelize.define('Publication', {
    contestMenuId: DataTypes.NUMBER,
    dateCreate: DataTypes.STRING,
    dateShow: DataTypes.STRING,
    visible: DataTypes.NUMBER,
    pubtype: DataTypes.NUMBER,
    archive: DataTypes.NUMBER
  }, {
      timestamps: true,
      createdAt: 'date_create',
      updatedAt: false
    });
  Publication.associate = function (models) {
    // associations can be defined here
  };
  return Publication;
};
