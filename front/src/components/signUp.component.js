import React, {useState} from "react";
import axios from 'axios';
import config from "./../config/config.json"

export default function SignUp() {
    const [pseudo, setPseudo] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const data = JSON.stringify({pseudo: pseudo, email: email, password: password})
            const res = await axios.post('http://localhost:' + config.port + '/api/auth/signup',data,{
            headers: {
                'Content-Type':'application/json'
            },
            });
            if(res.status == 200){
                setPseudo("");
                setPassword("");
                setMessage("Vous êtes désormais inscript.");
            }
        } catch (error) {
            setMessage(error.message);
        }
        
    }
    return (
        <form onSubmit={handleSubmit}>
            {message && <p>{message}</p>}
            <label>
                <p>Pseudo</p>
                <input type="text" onChange={e => setPseudo(e.target.value)}/>
            </label>
            <label>
                <p>Email</p>
                <input type="text" onChange={e => setEmail(e.target.value)}/>
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