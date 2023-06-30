const authAPI = require("./src/config/config.json");
const bodyParser = require('body-parser');
const express = require('express');
const axios = require('axios');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}



app.use(cors(corsOptions));

require('./src/routes/user.routes')(app);
require('./src/routes/auth.routes')(app);
require('./src/routes/collections.routes')(app);
const port = 3000;
var qs = require('qs');
var data = qs.stringify({});

var config = {
    method: 'get',
    url: 'https://api.twitch.tv/helix/games?name=',
    headers: {
        Authorization: authAPI.Authorization,
        'Client-ID': authAPI["Client-ID"],
        x7jn4h2zd6wv0xtaegj3zg6oohxt3f: authAPI.x7jn4h2zd6wv0xtaegj3zg6oohxt3f
    },
    data: data
};

var getGameReq = {
    method: 'get',
    url: 'https://api.twitch.tv/helix/games/top?first=100',
    headers: {
        Authorization: authAPI.Authorization,
        'Client-ID': authAPI["Client-ID"],
        x7jn4h2zd6wv0xtaegj3zg6oohxt3f: authAPI.x7jn4h2zd6wv0xtaegj3zg6oohxt3f
    },
    data: data
};
var getNextReq = {
    method: 'get',
    url: 'https://api.twitch.tv/helix/games/top?first=100&after=',
    headers: {
        Authorization: authAPI.Authorization,
        'Client-ID': authAPI["Client-ID"],
        x7jn4h2zd6wv0xtaegj3zg6oohxt3f: authAPI.x7jn4h2zd6wv0xtaegj3zg6oohxt3f
    },
    data: data
};

var getBeforeReq = {
    method: 'get',
    url: 'https://api.twitch.tv/helix/games/top?first=100&before=',
    headers: {
        Authorization: authAPI.Authorization,
        'Client-ID': authAPI["Client-ID"],
        x7jn4h2zd6wv0xtaegj3zg6oohxt3f: authAPI.x7jn4h2zd6wv0xtaegj3zg6oohxt3f
    },
    data: data
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/search/:name', (req, res) => {
    var name = req.params.name
    config.url = config.url + name
    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            let data = JSON.stringify(response.data);
            data = JSON.parse(data.slice(9, (data.length - 2)));
            data.box_art_url = data.box_art_url.replace('{width}', 170)
            data.box_art_url = data.box_art_url.replace('{height}', 230)
            console.log(data.box_art_url);

            res.send(data)
        })
        .catch(function (error) {
            console.log(error);
            res.send(error)
        });
})

app.get('/home', async (req, res) => {
    // axios(getGameReq)
    //     .then(function (response) {
    //         let data = JSON.stringify(response.data)
    //         const filtereddata = await datafilter(data);
    //         console.log("req 100 game");
    //         // console.log(data.find(g => g.id == "509658"));
    //         res.send(filtereddata)
    //     })
    //     .catch(function (error) {
    //         res.send(error);
    //     })
    try {
        const response = await axios(getGameReq);
        let data = JSON.stringify(response.data);
        let dataParsed = JSON.parse(data);
        cursor = dataParsed.pagination.cursor
        const filtereddata = await datafilter(data);
        console.log("req 100 game");
        // console.log(data.find(g => g.id == "509658"));
        res.send(filtereddata);
    } catch (error) {
        res.send(error);
    }
});

app.get('/next/:cursor', async (req, res) => {
    console.log(req.params.cursor);
    try {
        const response = await axios.get(getNextReq.url + req.params.cursor, {
            headers: {
                Authorization: authAPI.Authorization,
                'Client-ID': authAPI["Client-ID"],
                x7jn4h2zd6wv0xtaegj3zg6oohxt3f: authAPI.x7jn4h2zd6wv0xtaegj3zg6oohxt3f
            }
        });

        let data = JSON.stringify(response.data);
        const filteredData = await datafilter(data);
        res.send(filteredData);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

app.get('/before/:cursor', async (req, res) => {
    try {
        const response = await axios.get(getBeforeReq.url + req.params.cursor, {
            headers: {
                Authorization: authAPI.Authorization,
                'Client-ID': authAPI["Client-ID"],
                x7jn4h2zd6wv0xtaegj3zg6oohxt3f: authAPI.x7jn4h2zd6wv0xtaegj3zg6oohxt3f
            }
        });

        let data = JSON.stringify(response.data);
        const filteredData = await datafilter(data);
        res.send(filteredData);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const db = require("./src/models")
const User = db.user;
const Collection = db.collection;
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
function initData() {
    User.create({
        email: "user@user.com",
        password: "password",
        pseudo: "skaz",
        profilePicture: "C:\Users\pc\Pictures\emote twitch\Illustration_sans_titre.png",
        creationDate: Date.now(),
    });
}

function arrayRemove(arr, value) {

    return arr.filter(function (ele) {
        return ele.name != value;
    });
}

async function datafilter(data){
    // data = JSON.stringify(data)
    // console.log(Object.keys(data.data[0]).length);
    return data;
}

