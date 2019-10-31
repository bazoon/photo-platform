'use strict';
module.exports = (sequelize, DataTypes) => {
  const AwardType = sequelize.define('AwardType', {
    name: DataTypes.STRING,
    img: DataTypes.STRING
  }, {
    timestamps: false
  });
  AwardType.associate = function(models) {
    // associations can be defined here
  };
  return AwardType;
};
