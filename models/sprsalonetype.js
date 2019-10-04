'use strict';
module.exports = (sequelize, DataTypes) => {
  const SaloneType = sequelize.define('SaloneType', {
    name: DataTypes.STRING
  }, {
      tableName: 'spr_salone_types',
      timestamps: false
    });
  SaloneType.associate = function (models) {
    // associations can be defined here
  };
  return SaloneType;
};