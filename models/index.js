'use strict';

const pc = require('picocolors');

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const {Sequelize, DataTypes} = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};

const colors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray'];
let index = 0;

const db_config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: env === 'development' ? process.env.DB : process.env.TESTDB,
  host: process.env.HOST,
  dialect: 'postgres',
  define: {
    underscored: true
  },
  logging: l => {
    // const color = colors[index % 7];
    // console.log(pc[color](l));
    // index++;
  }
};

let sequelize = new Sequelize(
  db_config.database,
  db_config.username,
  db_config.password,
  db_config
);

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


async function initConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.initConnection = initConnection;
db.db_config = db_config;

module.exports = db;


















