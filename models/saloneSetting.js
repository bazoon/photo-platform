'use strict';
module.exports = (sequelize, DataTypes) => {
  const SaloneSetting = sequelize.define('SaloneSetting', {
    saloneId: DataTypes.INTEGER,
    settingId: DataTypes.INTEGER,
    keycheck: DataTypes.BOOLEAN,
    content: DataTypes.STRING,
  }, {
      timestamps: false,
      tableName: 'salon_settings'
    });
  return SaloneSetting;
};
