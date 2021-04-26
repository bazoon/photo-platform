'use strict';
module.exports = (sequelize, DataTypes) => {
  const Section = sequelize.define('Section', {
    contestId: DataTypes.INTEGER,
    maxCountImg: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
      timestamps: false
    });
  Section.associate = function (models) {
    // associations can be defined here
  };
  return Section;
};