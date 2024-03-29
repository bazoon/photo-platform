'use strict';
module.exports = (sequelize, DataTypes) => {
  const Organizer = sequelize.define('Organizer', {
    languageId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    emailSys: DataTypes.STRING,
    emailPub: DataTypes.STRING,
    addressLine1: DataTypes.STRING,
    addressLine2: DataTypes.STRING,
    www: DataTypes.STRING,
    phone: DataTypes.STRING,
    phoneTech: DataTypes.STRING,
    officer: DataTypes.STRING,
    logo: DataTypes.STRING,
    virtual: DataTypes.INTEGER,
    smtp: DataTypes.STRING,
    smtpPassword: {
      type: DataTypes.STRING,
      field: 'smtp_psw'
    },
    smtpUsePub: DataTypes.INTEGER,
    dateCreate: DataTypes.STRING,
    rowState: DataTypes.INTEGER,
    dateStatus: DataTypes.STRING
  }, {
      timestamps: true,
      createdAt: 'date_create',
      updatedAt: false
    });
  Organizer.associate = function (models) {
    Organizer.belongsTo(models.Language);
  };
  return Organizer;
};
