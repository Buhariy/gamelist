import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import config from "./../config/config.json"

export default function SearchBar() {
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            Search(searchInput);
        }
    }

    async function Search(searchInput) {
        try {
            const response = await fetch('http://localhost:' + config.port + '/search/' + searchInput, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            // .then(data => data.json());
            let data = await response.json();
            let game = data.data[0]
            game.box_art_url = game.box_art_url.replace('{width}', 170);
            game.box_art_url = game.box_art_url.replace('{height}', 230);
            data.data[0] = game
            navigate('/result',{state: data});
        } catch (error) {
            console.warn(error.message)
        }
        
        // setCollecList(res);
    }
    return (
        <>
            <input className="input-search"
                type="search"
                placeholder="Dofus..."
                OnEnter
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={searchInput} />
        </>
    )
}