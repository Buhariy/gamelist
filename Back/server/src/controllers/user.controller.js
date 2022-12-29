const db = require("../models");
const authAPI = require('./../config/config.json');
const axios = require("axios");
const User = db.user;
const Collection = db.collection;
const Op = db.Sequelize.Op;

var qs = require('qs');
var data = qs.stringify({});
var getGame = {
  method: 'get',
  url: 'https://api.twitch.tv/helix/games?id=',
  headers: {
      Authorization: authAPI.Authorization,
      'Client-ID': authAPI["Client-ID"],
      x7jn4h2zd6wv0xtaegj3zg6oohxt3f: authAPI.x7jn4h2zd6wv0xtaegj3zg6oohxt3f
  },
  data: data
};

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  // res.status(200).send("User Content.");
  // console.log(req.params.id);
  Collection.findAll({
    where: {
      userId: req.body.id
    }
  })
  .then(collections => {
    if(!collections || collections == [] ){
      return res.status(404).send({message: "Users collections not found."});
    }
    // console.log(collections.length);
    var gamesCollection = [];
    collections.forEach(element => {
      // console.log(getGame.url + element.gameId);
      getGame.url = getGame.url + element.gameId
      axios(getGame)
          .then(function (response) {
              // console.log(JSON.stringify(response.data));
              let data = JSON.stringify(response.data);
              data = JSON.parse(data.slice(9, (data.length - 2)));
              data.box_art_url = data.box_art_url.replace('{width}', 170)
              data.box_art_url = data.box_art_url.replace('{height}', 230)
              gamesCollection.push(data);
              // console.log(gamesCollection.length);
              if(gamesCollection.length == collections.length){
                res.status(200).send(gamesCollection);
              }
          })
          .catch(function (error) {
              console.log(error);
              res.send(error)
          });
        
          getGame.url = 'https://api.twitch.tv/helix/games?id=';
    }); 

    // res.status(200).send(gamesCollection);

  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};