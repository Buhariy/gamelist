const authAPI = require("./src/config/config.json") 
const express = require('express')
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
require('./src/routes/user.routes')(app);
require('./src/routes/auth.routes')(app);
const port = 3000;
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
    data: data
};

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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

const db = require("./src/models")
const User = db.user
db.sequelize.sync()
    .then(() => {
        // initData();
      console.log("Drop and Resynced db.");
    })
    .catch((err) => {
      console.log("Failed to sync db: " + err.message);
    });

/* 
    function init pour la table user 
    ApiGameId : ssbu(504461), miecraft(27471), dofus(20596), wow(18122), lol(19496)
*/
function initData(){
    User.create({
        email:"user@user.com",
        password:"password",
        pseudo:"skaz",
        profilePicture:"C:\Users\pc\Pictures\emote twitch\Illustration_sans_titre.png",
        creationDate: Date.now(),
    });
}