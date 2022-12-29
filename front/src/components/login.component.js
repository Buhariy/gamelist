import React, { useState } from "react";
import PropTypes from 'prop-types';


async function loginUser(credentials) {
    return fetch ('http://localhost:3000/api/auth/signin', {
        method: 'POST', 
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}

export default function Login({setToken}) {
    const [pseudo, setPseudoOrMail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            pseudo,
            password
        });
        setToken(token);
        // return <p>{token}</p>

        
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>
                <p>Pseudo</p>
                <input type="text" onChange={e => setPseudoOrMail(e.target.value)}/>
            </label>
            <label>
                <p>Password</p>
                <input type="password" onChange={e => setPassword(e.target.value)} />
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

Login.prototype = {
    setToken: PropTypes.func.isRequired
}