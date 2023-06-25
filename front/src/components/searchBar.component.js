import React, { useState } from "react";

export default function SearchBar() {
    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            console.log("enter");
            console.log(searchInput);
            Search(searchInput);
        }
    }

    async function Search(searchInput) {
        const response = await fetch('http://localhost:3000/search/' + searchInput, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
            // .then(data => data.json());
        // setCollecList(res);
    }
    return (
        <>
            <input
                type="search"
                placeholder="Search here"
                OnEnter
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={searchInput} />
        </>
    )
}