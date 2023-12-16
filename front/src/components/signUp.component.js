import React, { useState } from "react";
import axios from 'axios';
import config from "./../config/config.json"
import { NavLink } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa6";
import './../assets/form.css'

export default function SignUp() {
    const [pseudo, setPseudo] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const data = JSON.stringify({ pseudo: pseudo, email: email, password: password })
            const res = await axios.post('http://localhost:' + config.port + '/api/auth/signup', data, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (res.status == 200) {
                setPseudo("");
                setPassword("");
                setMessage("Vous êtes désormais inscript.");
            }
        } catch (error) {
            setMessage(error.message);
        }

    }
    return (
        <div className="FormStyle">
            <form onSubmit={handleSubmit} >
                <div className="circle">
                    <FaUserPlus className="icon" />
                </div>
                <div className="formCard">
                    {message && <p>{message}</p>}
                    <label>
                        <p className="navlinkStyle">Pseudo</p>
                        <input type="text" onChange={e => setPseudo(e.target.value)} />
                    </label>
                    <label>
                        <p className="navlinkStyle">Email</p>
                        <input type="text" onChange={e => setEmail(e.target.value)} />
                    </label>
                    <label>
                        <p className="navlinkStyle">Password</p>
                        <input type="password" onChange={e => setPassword(e.target.value)} />
                    </label>
                    <div className="divSignup">
                        <button className="btnCTA navlinkStyle" id="btnSignup" type="submit">S'inscrire</button>
                    </div>
                </div>
            </form>
        </div>

    )
}