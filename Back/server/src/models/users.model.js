const Sequelize = require("sequelize");
const {  DataTypes } = require("sequelize");

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
    });
  
    return user;
  };