const dbConfig = require("../config/dbconfig")
const Sequilze = require("sequelize");
const sequelize = new Sequilze(dbConfig.DB, dbConfig.USER,dbConfig.PASSWORD)