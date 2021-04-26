'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};

const db_config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: env === 'development' ? process.env.DB : process.env.TESTDB,
  host: process.env.HOST,
  dialect: 'postgres',
  define: {
    underscored: true
  },
  logging: true
};

let sequelize = new Sequelize(
  db_config.database,
  db_config.username,
  db_config.password,
  db_config
);

console.log(sequelize.require,11)
const definitions = require('./definitions');
console.log(definitions)
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    // const model = sequelize.require(path.join(__dirname, file));
    // db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
