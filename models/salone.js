'use strict';
module.exports = (sequelize, DataTypes) => {
  const Salone = sequelize.define('Salone', {
    sprSaloneTypeId: {
      type: DataTypes.INTEGER,
    },
    organizerId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    regular: DataTypes.INTEGER,
    private: DataTypes.INTEGER,
    domain: DataTypes.STRING,
    slug: DataTypes.STRING,
    designCode: DataTypes.STRING,
    rowState: DataTypes.STRING
  }, {
      timestamps: false
    });
  Salone.associate = function (models) {
    // associations can be defined here
  };
  return Salone;
};
