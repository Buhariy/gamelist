import React, {useState} from "react";
import axios from 'axios';

export default function SignUp() {
    const [pseudo, setPseudo] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const data = JSON.stringify({pseudo: pseudo, email: email, password: password})
        const res = await axios.post('http://localhost:3000/api/auth/signup',data,{
            headers: {
                'Content-Type':'application/json'
            },
        })
    }
    return (
        <form onSubmit={handleSubmit}>
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