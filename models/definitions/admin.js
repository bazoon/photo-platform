'use strict';
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    organizerId: DataTypes.INTEGER,
    admType: DataTypes.NUMBER
  }, {
      timestamps: false,
    });
  Admin.associate = function (models) {
    // associations can be defined here
  };
  return Admin;
};