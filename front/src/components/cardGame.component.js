import axios from "axios";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa"
import './../assets/cards.css'

function getUserId() {
    var tokenString = sessionStorage.getItem('accessToken');
    tokenString = JSON.parse(tokenString)
    return tokenString.id
}



export default function CardGame(props) {
    const [gameId,setGameId] = useState(props.gameId);

    const handleSubmit = (e,gameId) => {
        console.log(gameId);
        console.log(e.target.value);
        const data = JSON.stringify({ gameId: parseInt(gameId), userId: getUserId() });
        const res = axios.post('http://localhost:3000/addCollection', data, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }
    return (
        <div class="card" key={props.id}>
            {/* <Image src="img_avatar.png" alt="Avatar" style="width:100%"> */}
            <img src={props.link} alt={props.name} />
            <div class="container">
                <h4><b id="acontainer">{props.name}</b></h4>
                <FaPlus
                onClick={
                    // setGameId(props.gameId)
                     e => handleSubmit(e,props.gameId)
                }
                />
            </div>
        </div>
    );
}