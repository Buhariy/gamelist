import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import config from "./../config/config.json";
import axios from "axios";
import './../assets/form.css'

function getUser() {
    var tokenString = sessionStorage.getItem('accessToken');
    tokenString = JSON.parse(tokenString)
    return tokenString
}



export default function UpdateUser() {
    const [pseudo, setPseudo] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState("");
    const [repassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [isLogged, setLogged] = useState(false);
    const [id, setId] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        let user = getUser();
        console.log(user.id);
        if (user != null && user.accessToken.length > 50) {
            setId(user.id);
            console.log(id);
            setLogged(true);
            fetchUser(id);
        } else {
            setLogged(false);
            navigate('/Signin')
        }
    }, []);

    async function fetchUser() {
        const response = await fetch('http://localhost:' + config.port + '/MyProfil/' + getUser().id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(data => data.json());
        let user = await response;
        console.log(user + " fetchuser")
        setPseudo(user.pseudo);
        setEmail(user.email);
    }

    const handleSubmit = async e => {
        setMessage("");
        e.preventDefault();
        try {
            if (password != repassword) {
                throw Error("Les mots de passes se sont pas identiques.")
            }
            const data = JSON.stringify({ id: id, pseudo: pseudo, email: email, password: password, repassword: repassword })
            const res = await axios.post('http://localhost:' + config.port + '/update', data, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            setMessage("Vos infos ont étais mis à jours.");

        } catch (error) {
            setMessage("Ce pseudo ou email existe déjà !");
        }
    }



    return (
        <div>
            <h1>Mon profile</h1>
            <div className="FormStyle">
                <form onSubmit={handleSubmit}>
                    <div className="circle">
                        <FaUserEdit className="icon" />
                    </div>
                    {message && <p>{message}</p>}
                    <label>
                        <p>Pseudo</p>
                        <input type="text" value={pseudo} onChange={e => setPseudo(e.target.value)} />
                    </label>
                    <label>
                        <p>Email</p>
                        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" onChange={e => setPassword(e.target.value)} />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" onChange={e => setConfirmPassword(e.target.value)} />
                    </label>
                    <div className="divSignup">
                        <button className="btnCTA navlinkStyle" id="btnSignup" type="submit">Sauvegarder</button>
                    </div>
                </form>
            </div>
        </div>
    );
}