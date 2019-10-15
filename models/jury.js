'use strict';
module.exports = (sequelize, DataTypes) => {
  const Jury = sequelize.define('Jury', {
    userId: DataTypes.INTEGER,
    contestId: DataTypes.INTEGER,
    rank: DataTypes.STRING
  }, {
      timestamps: false
    });

  return Jury;
};