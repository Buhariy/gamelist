import axios from "axios";
import React, { useEffect, useState } from "react";
import CardGame from "./cardGame.component";

function getUser() {
    var tokenString = sessionStorage.getItem('accessToken');
    tokenString = JSON.parse(tokenString)
    return tokenString
}



export default function Gamelist() {
    const [list, setList] = useState([]);
    const [isLogged, setLogged] = useState(false);
    const [collectList, setCollecList] = useState(null);

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

      const res = await fetch ('http://localhost:3000/collection', {
        method: 'POST', 
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({id: getUser().id})
    })
    .then(data => data.json());
    setCollecList(res);
  }

    function formatingGame(game) {
            // if(game.id == "509658"){
            //     console.warn(game.id)
            //     console.warn(collectList[2].id)
            // }
            
        game.box_art_url = game.box_art_url.replace('{width}', 170)
        game.box_art_url = game.box_art_url.replace('{height}', 230)
        // collectList.forEach(g => {
        //     if(g.id == game.id){
        //         g["inMyCollection"] = true
        //     }
        // });

        return game
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

    // console.log(list[0].inMyCollection);
    return (
        <div className="cardgrp">

            {
                list.map(g => {
                    formatingGame(g)
                    console.log(g);
                    return (
                        // <React.Fragment key={g.id}>
                        <>
                            {isLogged ? 
                                <CardGame key={g.id} name={g.name} link={g.box_art_url} gameId={g.id}  />
                                : 
                                <CardGame key={g.id} name={g.name} link={g.box_art_url} gameId={g.id} />
                            }
                        </>
                        // </React.Fragment> 
                    );
                    // return <p key={g.id} name={g.name} link={g.box_art_url}>{g.name}</p>
                })
            }
        </div>
    );
}