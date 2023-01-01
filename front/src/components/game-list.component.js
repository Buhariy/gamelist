import axios from "axios";
import React, { useEffect, useState } from "react";
import CardGame from "./cardGame.component";

export default function Gamelist() {
    const [list, setList] = useState([]);

    useEffect(() => {
        fetchGames();
    }, []);

    function formatingGame(game) {
        game.box_art_url = game.box_art_url.replace('{width}', 170)
        game.box_art_url = game.box_art_url.replace('{height}', 230)
    }

    async function fetchGames() {
        const response = await fetch('http://localhost:3000/home', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const games = await response.json();
        console.log((games.data));
        setList(games.data)

    }
    return (
        <div className="cardgrp">

            {
                list.map(g => {
                    formatingGame(g)
                    console.log(g);
                    return (
                        // <React.Fragment key={g.id}>
                        <>
                            <CardGame key={g.id} name={g.name} link={g.box_art_url} gameId={g.id} />
                        </>
                        // </React.Fragment> 
                        );
                    // return <p key={g.id} name={g.name} link={g.box_art_url}>{g.name}</p>
                })
            }
        </div>
    );
}