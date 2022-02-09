'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contest = sequelize.define('Contest', {
    saloneId: DataTypes.NUMBER,
    subname: DataTypes.STRING,
    years: DataTypes.STRING,
    dateStart: DataTypes.STRING,
    dateStop: DataTypes.STRING,
    dateJuriEnd: DataTypes.STRING,
    dateRateShow: DataTypes.STRING,
    showType: DataTypes.NUMBER,
    showRateState: DataTypes.NUMBER,
    democraty: DataTypes.NUMBER,
    payType: DataTypes.NUMBER,
    sectionCount: DataTypes.NUMBER,
    maxrate: DataTypes.NUMBER,
    maxsize: DataTypes.NUMBER,
    maxWeight: DataTypes.NUMBER
  }, {
      timestamps: false
    });
  Contest.associate = function (models) {
    // associations can be defined here
  };
  return Contest;
};
