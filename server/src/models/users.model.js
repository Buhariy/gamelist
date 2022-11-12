// const dbConfig = require("./src/config/dbconfig")
const Sequelize = require("sequelize");
const {  DataTypes } = require("sequelize");
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//     host: dbConfig.HOST,
//     dialect: dbConfig.dialect,
//     port : dbConfig.PORT
//     // operatorsAliases: false,

//     // pool: {
//     //     max: dbConfig.pool.max,
//     //     min: dbConfig.pool.min,
//     //     acquire: dbConfig.pool.acquire,
//     //     idle: dbConfig.pool.idle
//     // }
// });

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;
// db.sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.');
//  }).catch((error) => {
//     console.error('Unable to connect to the database: ', error);
//  });

module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("user", {
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      pseudo: {
        type: Sequelize.STRING
      },
      profilePicture: {
        type: Sequelize.STRING
      },
      creationDate: {
        type: Sequelize.DATE
      },
    });
  
    return user;
  };