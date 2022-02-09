'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rate = sequelize.define('Rate', {
    photoworkId: DataTypes.INTEGER,
    juryId: DataTypes.INTEGER,
    rateValue: DataTypes.DOUBLE,
    dateRate: DataTypes.STRING
  }, {
      timestamps: true,
      createdAt: 'date_rate',
      updatedAt: false
    });
  Rate.associate = function (models) {
    // associations can be defined here
  };
  return Rate;
};
