import React, { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import config from "./../config/config.json"



async function loginUser(credentials) {
    return fetch('http://localhost:' + config.port +'/api/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => {
            if (data.ok) {
                window.location.href = '/home';
                
                return data.json();
            }
            else {
                throw new Error('Erreur de connexion');
            }
        });
}

export default function Login({ setToken }) {
    const formRef = useRef(null);
    const [pseudo, setPseudoOrMail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const form = formRef.current;
            const token = await loginUser({
                PseudoOrEmail: form.pseudo.value,
                password: form.password.value
            });
            console.log(token)
            setToken(token); // Utilisez le setter provenant des props si nécessaire
        } catch (error) {
            setError(error.message)
        }
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <label>
                <p>Pseudo</p>
                <input type="text" name="pseudo" onChange={e => setPseudoOrMail(e.target.value)} />
            </label>
            <label>
                <p>Password</p>
                <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
