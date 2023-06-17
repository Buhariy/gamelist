import React from "react";

export default function Logout({onLogout}) {
    // function logout() {
        
        // const handleLogout = () => {
            var tokenString = sessionStorage.getItem("accessToken");
            tokenString = JSON.parse(tokenString)
            if (tokenString != null) {
                sessionStorage.removeItem("accessToken");
            }
            onLogout();
        // }
    // return (
    //     <>
    //         <button onClick={handleLogout}>Déconnexion</button>
    //     </>
    // )
}