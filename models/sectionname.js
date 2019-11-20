'use strict';
module.exports = (sequelize, DataTypes) => {
  const SectionName = sequelize.define(
    'SectionName',
    {
      languageId: DataTypes.INTEGER,
      sectionId: DataTypes.INTEGER,
      name: DataTypes.STRING
    },
    {
      timestamps: false
    }
  );
  return SectionName;
};
