'use strict';
module.exports = (sequelize, DataTypes) => {
  const Award = sequelize.define(
    'Award',
    {
      photoworkId: DataTypes.INTEGER,
      awardsStackId: DataTypes.INTEGER
    },
    {
      timestamps: false
    }
  );
  return Award;
};
