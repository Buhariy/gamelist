// const { checkDuplicateEmail } = require("../middleware/verifyUpdateEmail");
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
  Collection.findAll({
    where: {
      userId: req.body.id
    }
  })
  .then(collections => {
    if(!collections || collections == [] ){
      return res.status(404).send({message: "Users collections not found."});
    }
    var gamesCollection = [];
    collections.forEach(element => {
      getGame.url = getGame.url + element.gameId
      axios(getGame)
          .then(function (response) {
              let data = JSON.stringify(response.data);
              data = JSON.parse(data.slice(9, (data.length - 2)));
              data.box_art_url = data.box_art_url.replace('{width}', 170)
              data.box_art_url = data.box_art_url.replace('{height}', 230)
              gamesCollection.push(data);
              if(gamesCollection.length == collections.length){
                res.status(200).send(gamesCollection);
              }
          })
          .catch(function (error) {
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

exports.myProfil = (req,res) => {
  User.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    res.status(200).send({
      id: user.id,
      pseudo: user.pseudo,
      email: user.email,
      message : "connected"
    });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.userUpdate = async (req,res) => {
  const data = await User.findOne({
    where: {
      id: req.body.id
    }
  });
  if(data == null)
    res.status(404).send("User not found");

  let userback = data.dataValues;

  if(userback.pseudo != "")
    userback.pseudo = req.body.pseudo;
  
  if(userback.email != "")
    userback.email = req.body.email;
  if(req.body.password!= "" && req.body.password == req.body.repassword && (bcrypt.compareSync(req.body.password,user.password))){
      userback.password = bcrypt.hashSync(req.body.password, 8)
  }
  
  const [updated] = await User.update(
    {
    pseudo: userback.pseudo,
    email: userback.email,
    password: userback.password,
  },{
    where: {id:userback.id},
  });

}
