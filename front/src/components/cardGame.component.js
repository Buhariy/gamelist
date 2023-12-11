import axios from "axios";
import React, { useState,useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa"
import './../assets/cards.css'
import config from "./../config/config.json"

function getUser() {
    var tokenString = sessionStorage.getItem('accessToken');
    tokenString = JSON.parse(tokenString)
    return tokenString
}


export default function CardGame(props) {
    const [gameId, setGameId] = useState(props.gameId);
    const [isLogged, setLogged] = useState(false);

    useEffect(() => {
        let user = getUser();
        if(user != null && user.accessToken.length > 50){
            setLogged(true);
        }else{
            setLogged(false);
        }
    }, []);

    const handleSubmit = (e, gameId,action) => {
        let user = getUser();
        if (user != null && user.id != null) {

            setLogged(true);
            const data = JSON.stringify({ gameId: parseInt(gameId), userId: user.id });
            if(action){
                const res = axios.post('http://localhost:' + config.port +'/addCollection', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
            }else if(!action){
                const res = axios.post('http://localhost:' + config.port +'/deleteCollection', data, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            props.ToDelete(props.gameId);
            }
            
        }
    }

    return (
        <div class="card" key={props.id}>
            {/* <Image src="img_avatar.png" alt="Avatar" style="width:100%"> */}
            <img src={props.link} alt={props.name} />
            <div class="container">
                <h4 id="acontainer"><b >{props.name}</b></h4>
                {props.NoIcon ?
                 null
                  : 
                    (props.inMyCollection ?
                        <FaMinus
                            onClick={
                                e=> handleSubmit(e, props.gameId,false)
                            }
                            />
                        :
                        <>
                            <FaPlus
                                onClick={
                                    // setGameId(props.gameId)
                                    e => handleSubmit(e, props.gameId,true)
                                }
                            />
                        </>
                    )
                }
            </div>
        </div>
    );
}