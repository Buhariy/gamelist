const authAPI = require("./src/config/config.json") 
const express = require('express')
const axios = require('axios');
const app = express()
const port = 3000
var qs = require('qs');
var data = qs.stringify({});

var config = {
    method: 'get',
    url: 'https://api.twitch.tv/helix/games?name=',
    headers: {
        Authorization: authAPI.Authorization,
        'Client-ID': authAPI["Client-ID"],
        x7jn4h2zd6wv0xtaegj3zg6oohxt3f : authAPI.x7jn4h2zd6wv0xtaegj3zg6oohxt3f
    },
    // headers: { 
    //     'Authorization': 'Bearer wmv4cnf8xucwllspw04269c9e82rtf', 
    //     'Client-ID': 'x7jn4h2zd6wv0xtaegj3zg6oohxt3f'
    //   },
    data: data
};

app.get('/search/:name', (req, res) => {
    var name = req.params.name
    config.url = config.url+name
    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            let data = JSON.stringify(response.data);
            data = JSON.parse(data.slice(9,(data.length-2)));
            data.box_art_url = data.box_art_url.replace('{width}',170)
            data.box_art_url = data.box_art_url.replace('{height}',230)
            console.log(data.box_art_url);

            res.send(data)
        })
        .catch(function (error) {
            console.log(error);
            res.send(error)
        });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const dbConfig = require("./src/config/dbconfig")
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port : dbConfig.PORT
    // operatorsAliases: false,

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
db.sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });