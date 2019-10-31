'use strict';
module.exports = (sequelize, DataTypes) => {
  const AwardStack = sequelize.define(
    'AwardStack',
    {
      contestId: DataTypes.INTEGER,
      awardTypeId: DataTypes.INTEGER,
      position: DataTypes.INTEGER,
      issued: DataTypes.INTEGER,
      countAwards: DataTypes.INTEGER
    },
    {
      tableName: 'awards_stacks',
      timestamps: false
    }
  );
  return AwardStack;
};
