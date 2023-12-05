import axios from 'axios';
import React,{useEffect,useState} from 'react';
import CardGame from './cardGame.component';
import config from "./../config/config.json"


function getUserId(){
    var tokenString = sessionStorage.getItem('accessToken');
    tokenString = JSON.parse(tokenString)
    return tokenString.id
} 
export default function MyCollection() {
  const [list, setList] = useState([]);

    useEffect(() => {
        fetchCollection();
    }, []);

    async function fetchCollection() {

      const res = await fetch ('http://localhost:' + config.port +'/collection', {
        method: 'POST', 
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({id: getUserId()})
    })
    .then(data => data.json());
    setList(res);
    console.log(res)
  }

  const DeleteToList = (id) => {
    let newList = list;
    // newList.splice(game);
    newList = newList.filter(g => g.id != id);
    setList(newList);
  };

  return(
    <div >
      <h2>Ma liste</h2>
      <div className="cardgrp">
      {
        list.map(gameCollec => {
          return (
          <>
          {/* <p>{gameCollec.name}</p> */}
            <CardGame key={gameCollec.id} name={gameCollec.Name} link={gameCollec.box_art_url} gameId={gameCollec.id} inMyCollection={true} ToDelete={DeleteToList} />
          </>
          );
        })
      }
      </div>
    </div>
  );
}