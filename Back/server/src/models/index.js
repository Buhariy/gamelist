const dbConfig = require("../config/dbconfig")
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    // operatorsAliases: false,
    port: dbConfig.PORT,
    // pool: {
    //     max: dbConfig.pool.max,
    //     min: dbConfig.pool.min,
    //     acquire: dbConfig.pool.acquire,
    //     idle: dbConfig.pool.idle
    // }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./users.model")(sequelize, Sequelize);
db.collection = require("./collection.model")(sequelize, Sequelize);

db.user.hasMany(db.collection, { as: "collection" });
db.collection.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});

module.exports = db;