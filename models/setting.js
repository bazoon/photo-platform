'use strict';
module.exports = (sequelize, DataTypes) => {
  const Setting = sequelize.define('Setting', {
    code: DataTypes.INTEGER,
    levelable: DataTypes.INTEGER,
    enable: DataTypes.BOOLEAN,
    typeSet: DataTypes.STRING,
  }, {
      timestamps: false
    });
  return Setting;
};
