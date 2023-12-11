import React from "react";

export default function Logout({onLogout}) {
            var tokenString = sessionStorage.getItem("accessToken");
            tokenString = JSON.parse(tokenString)
            if (tokenString != null) {
                sessionStorage.removeItem("accessToken");
            }
            onLogout();
}