import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "./../config/config.json";
import './../assets/carousel.css';
import CardGame from "./cardGame.component";

async function clean(games) {
    let cleanedGame = games.filter(isGame)
    return cleanedGame;
}

function getUser() {
    var tokenString = sessionStorage.getItem('accessToken');
    tokenString = JSON.parse(tokenString)
    return tokenString;
}

function isGame(game) {
    let val = "";
    let bannedGame = config.bannedGame
    val = bannedGame.find(bg => bg == game.name);
    if (val == game.name)
        return false
    else if (val != game.name)
        return true
}

function formatingGame(game) {
    game.box_art_url = game.box_art_url.replace('{width}', 170);
    game.box_art_url = game.box_art_url.replace('{height}', 230);
    return game;
}

export default function TopGame() {
    const [list, setList] = useState([]);
    const [cards, setCards] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [currentCardIndex2, setCurrentCardIndex2] = useState(1);
    const [currentCardIndex3, setCurrentCardIndex3] = useState(2);
    const [isLogged, setLogged] = useState(false);

    useEffect(() => {
        let user = getUser();
        if (user != null && user.accessToken.length > 50) {
            setLogged(true);
        } else {
            setLogged(false);
        }
        fetchTopGame();
    }, []);

    async function fetchTopGame() {
        try {
            const response = await axios.get('http://localhost:' + config.port + '/top', {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = response.data;
            setList(await clean(data.data)); // Mettre à jour la liste avec les nouvelles données reçues
        } catch (error) {
            console.log(error);
        }
    }

    const nextCard = () => {
        const lastIndex = list.length - 1;
        const shouldResetIndex = currentCardIndex === lastIndex;
        const shouldResetIndex2 = currentCardIndex2 === lastIndex;
        const shouldResetIndex3 = currentCardIndex3 === lastIndex;
        const index = shouldResetIndex ? 0 : currentCardIndex + 1;
        const index2 = shouldResetIndex2 ? 0 : currentCardIndex2 + 1;
        const index3 = shouldResetIndex3 ? 0 : currentCardIndex3 + 1;
        console.log(list[index]);
        console.log(list[index2]);
        console.log(list[index3]);
        setCurrentCardIndex(index);
        setCurrentCardIndex2(index2);
        setCurrentCardIndex3(index3);
    };

    const prevCard = () => {
        const lastIndex = list.length - 1;
        const shouldResetIndex = currentCardIndex === 0;
        const shouldResetIndex2 = currentCardIndex2 === 0;
        const shouldResetIndex3 = currentCardIndex3 === 0;
        const index = shouldResetIndex ? lastIndex : currentCardIndex - 1;
        const index2 = shouldResetIndex2 ? lastIndex : currentCardIndex2 - 1;
        const index3 = shouldResetIndex3 ? lastIndex : currentCardIndex3 - 1;
        setCurrentCardIndex(index);
        setCurrentCardIndex2(index2);
        setCurrentCardIndex3(index3);
    };


    let cleanedGame = list.map(g => formatingGame(g));

    // let cardsGame = []
    // cleanedGame.forEach(element => {
    //     cardsGame.push(new CardGame(element));
    // });
    // setCards(cardsGame);
    return (
        <div>
            <h1>Top 10 des jeux du moment</h1>
            <div className="carousel">
                <button onClick={prevCard}>Previous</button>
                {list.length > 0 && <CardGame className='slide' key={list[currentCardIndex].id} name={list[currentCardIndex].name} link={list[currentCardIndex].box_art_url} gameId={list[currentCardIndex].id} />}
                {list.length > 0 && <CardGame key={list[currentCardIndex2].id}
                    name={list[currentCardIndex2].name}
                    link={list[currentCardIndex2].box_art_url}
                    gameId={list[currentCardIndex2].id} />}

                {list.length > 0 && <CardGame key={list[currentCardIndex3].id}
                    name={list[currentCardIndex3].name}
                    link={list[currentCardIndex3].box_art_url}
                    gameId={list[currentCardIndex3].id} />}
                <button onClick={nextCard}>Next</button>
            </div>
        </div>
    );
}

