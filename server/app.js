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
        'Authorization': 'Bearer wmv4cnf8xucwllspw04269c9e82rtf',
        'Client-ID': 'x7jn4h2zd6wv0xtaegj3zg6oohxt3f',
        'x7jn4h2zd6wv0xtaegj3zg6oohxt3f': ''
    },
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