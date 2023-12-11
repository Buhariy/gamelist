import axios from "axios";
import React, { useEffect, useState } from "react";
import CardGame from "./cardGame.component";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md"
import config from "./../config/config.json"

function getUser() {
    var tokenString = sessionStorage.getItem('accessToken');
    tokenString = JSON.parse(tokenString)
    return tokenString;
}

async function clean(games) {
    let cleanedGame = games.filter(isGame)
    return cleanedGame;
}

function isGame(game){
    let val = "";
    let bannedGame = config.bannedGame
    val = bannedGame.find(bg => bg == game.name);
    if(val == game.name)
        return false
    else if(val != game.name)
        return true
}

export default function Gamelist() {
    const [list, setList] = useState([]);
    const [isLogged, setLogged] = useState(false);
    const [collectList, setCollecList] = useState(null);
    const [pagi, setPagi] = useState();
    useEffect(() => {
        let user = getUser();
        if (user != null && user.accessToken.length > 50) {
            setLogged(true);
            fetchCollection();
        } else {
            setLogged(false);
        }
        fetchGames();
    }, []);

    async function fetchCollection() {
        const res = await fetch('http://localhost:' + config.port +'/collection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: getUser().id })
        })
        .then(data => data.json());
        const cleanedGame = clean(res);
        setCollecList(cleanedGame);
    }

    function formatingGame(game) {
        game.box_art_url = game.box_art_url.replace('{width}', 170);
        game.box_art_url = game.box_art_url.replace('{height}', 230);
        return game;
    }

    async function nextPage() {
        try {
            const response = await axios.get('http://localhost:' + config.port +'/next/' + pagi, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = response.data;
            setList(await clean(data.data)); // Mettre à jour la liste avec les nouvelles données reçues
            setPagi(data.pagination.cursor);
        } catch (error) {
            console.log(error);
        }
    }

    async function beforePage() {
        try {
            const response = await axios.get('http://localhost:' + config.port +'/before/' + pagi, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = response.data;
            // setList(data.data); // Mettre à jour la liste avec les nouvelles données reçues
            setPagi(data.pagination.cursor);
            setList(await clean(data.data));
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchGames() {
        const response = await fetch('http://localhost:' + config.port +'/home', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        var games = await response.json();
        setPagi(games.pagination.cursor);
        setList(games.data);
        setList(await clean(games.data));
    }

    return (
        <>
            <div className="cardgrp">

                {
                    list.map(g => {
                        formatingGame(g)
                        return (
                            <>
                                {isLogged ?
                                    <CardGame key={g.id} name={g.name} link={g.box_art_url} gameId={g.id} />
                                    :
                                    <CardGame key={g.id} name={g.name} link={g.box_art_url} gameId={g.id} NoIcon={true} />
                                }
                            </>
                        );
                    })
                }
            </div>
            <div className="navigationDiv">
                <button onClick={beforePage}>
                    <MdOutlineNavigateBefore className="navigateIcon" />
                </button>
                <button onClick={nextPage}>
                    <MdOutlineNavigateNext className="navigateIcon" />
                </button>
            </div>
        </>
    );
}