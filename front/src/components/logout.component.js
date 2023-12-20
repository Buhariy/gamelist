import React from "react";
import { useNavigate } from 'react-router-dom';

export default function Logout({onLogout}) {
    const navigate = useNavigate();
            var tokenString = sessionStorage.getItem("accessToken");
            tokenString = JSON.parse(tokenString)
            if (tokenString != null) {
                sessionStorage.removeItem("accessToken");
            }
            onLogout();
            navigate('/Home');
}