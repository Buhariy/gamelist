import React, { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import config from "./../config/config.json";
import { MdLogin } from "react-icons/md";
import './../assets/form.css'



async function loginUser(credentials) {
    return fetch('http://localhost:' + config.port + '/api/auth/signin', {
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
            setToken(token); // Utilisez le setter provenant des props si nécessaire
        } catch (error) {
            setError(error.message)
        }
    };

    return (
        <div className="FormStyle">
            <form ref={formRef} onSubmit={handleSubmit}>
                <div className="circle">
                    <MdLogin className="icon" />
                </div>
                {error && <p>{error}</p>}
                <div className="formCard">
                    <label>
                        <p className="navlinkStyle" >Pseudo</p>
                        <input type="text" name="pseudo" onChange={e => setPseudoOrMail(e.target.value)} />
                    </label>
                    <label>
                        <p className="navlinkStyle" >Password</p>
                        <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
                    </label>
                    <div className="divSignup">
                        <button className="btnCTA navlinkStyle" id="btnSignup" type="submit">Se connecter</button>
                    </div>
                </div>
            </form>
        </div>

    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
