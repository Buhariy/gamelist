import axios from 'axios';
import React,{useEffect,useState} from 'react';
import CardGame from './cardGame.component';

export default function MyCollection() {
  const [list, setList] = useState([]);

    useEffect(() => {
        fetchCollection();
    }, []);

    async function fetchCollection() {

      const res = await fetch ('http://localhost:3000/collection', {
        method: 'POST', 
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({id: 5})
    })
    .then(data => data.json());
    setList(res);

  }
  return(
    <div >
      <h2>Ma liste</h2>
      <div className="cardgrp">
      {
        list.map(gameCollec => {
          return (
          <>
          {/* <p>{gameCollec.name}</p> */}
            <CardGame key={gameCollec.id} name={gameCollec.name} link={gameCollec.box_art_url} />
          </>
          );
        })
      }
      </div>
    </div>
  );
}