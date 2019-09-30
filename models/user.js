'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    nickName: DataTypes.STRING,
    psw: DataTypes.STRING,
    salt: DataTypes.STRING,
    avatar: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    userType: DataTypes.INTEGER,
    emailState: DataTypes.INTEGER,
    emailCode: DataTypes.STRING,
    biography: DataTypes.STRING,
    awards: DataTypes.STRING,
    rowState: DataTypes.INTEGER
  }, {
      timestamps: true,
      createdAt: 'date_create',
      updatedAt: false
    });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};