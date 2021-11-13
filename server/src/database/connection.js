// Get sequelize
const Sequelize = require("sequelize");

// Create db variable
const db = {};

// Create sequelize variable and get config as object
// Database config custom
const sequelize = new Sequelize("todo-app", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: console.log,
  freezeTableName: true,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Enter the database config to sequelize
db.sequelize = sequelize;

// Exports module
module.exports = db;
