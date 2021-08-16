'use strict';
module.exports = (sequelize, DataTypes) => {
  const InformationSchema = sequelize.define('InformationSchema', {
    tableName: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    columnName: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    DataType: {
      type: DataTypes.STRING,
    },
    isNullable: DataTypes.STRING
  }, {
    timestamps: false,
    schema: 'information_schema',
    tableName: 'columns'
  });

  return InformationSchema;
};
