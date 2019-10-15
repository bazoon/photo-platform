'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photowork = sequelize.define('Photowork', {
    registrationContestId: DataTypes.INTEGER,
    sectionId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    filename: DataTypes.STRING,
    moder: DataTypes.INTEGER,
    reasonModeration: DataTypes.STRING,
    dateAdd: DataTypes.DATE,
    average: DataTypes.DOUBLE,
    mediane: DataTypes.DOUBLE,
    demosRate: DataTypes.DOUBLE,
    yearShot: DataTypes.STRING,
    locateShot: DataTypes.STRING
  }, {
      createdAt: 'date_add',
      updatedAt: false
    });
  Photowork.associate = function (models) {
    // associations can be defined here
  };
  return Photowork;
};