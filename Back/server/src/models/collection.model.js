const Sequelize = require("sequelize");
const {  DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const collection = sequelize.define("collection", {
      gameId: {
        type: Sequelize.INTEGER
      },
    });
  
    return collection;
  };