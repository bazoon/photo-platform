'use strict';
module.exports = (sequelize, DataTypes) => {
  const RegistrationContest = sequelize.define('RegistrationContest', {
    userId: DataTypes.INTEGER,
    contestId: DataTypes.INTEGER,
    dateReg: DataTypes.DATE,
    sectionCount: DataTypes.INTEGER,
    regState: DataTypes.INTEGER,
    rejectionReason: DataTypes.STRING,
    payment: DataTypes.INTEGER
  }, {
    createdAt: 'dateReg',
    updatedAt: false
  });
  RegistrationContest.associate = function (models) {
    // associations can be defined here
  };
  return RegistrationContest;
};
