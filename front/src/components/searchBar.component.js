import React, { useState } from "react";

export default function SearchBar() {
    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    }

    return (
        <>
            <input
                type="search"
                placeholder="Search here"
                onChange={handleChange}
                value={searchInput} />
        </>
    )
}