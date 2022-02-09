'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    memoField: DataTypes.STRING,
    birthday: DataTypes.STRING,
    postIndex: DataTypes.STRING,
    address: DataTypes.STRING,
    countryId: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
      timestamps: false,
      createdAt: false,
      updatedAt: false
    });
  Customer.associate = function (models) {
    // associations can be defined here
  };
  return Customer;
};
