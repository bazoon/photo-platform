'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contest = sequelize.define('Contest', {
    saloneId: DataTypes.NUMBER,
    subname: DataTypes.STRING,
    years: DataTypes.STRING,
    dateStart: DataTypes.DATE,
    dateStop: DataTypes.DATE,
    dateJuriEnd: DataTypes.DATE,
    dateRateShow: DataTypes.DATE,
    showType: DataTypes.NUMBER,
    showRateState: DataTypes.NUMBER,
    democraty: DataTypes.NUMBER,
    payType: DataTypes.NUMBER,
    sectionCount: DataTypes.NUMBER,
    maxCountImg: DataTypes.NUMBER,
    maxrate: DataTypes.NUMBER,
    maxsize: DataTypes.NUMBER,
    maxWeight: DataTypes.NUMBER,
    inworknow: DataTypes.BOOLEAN,
  }, {
    timestamps: false
  });
  Contest.associate = function (models) {
    // associations can be defined here
  };
  return Contest;
};
