import React from "react";

export default function Logout() {
    // function logout() {
        var tokenString = sessionStorage.getItem("accessToken");
        tokenString = JSON.parse(tokenString)
        if (tokenString != null) {
            sessionStorage.removeItem("accessToken");
        }
    // }
    // return (
    //     <>
    //         <button onClick={logout}></button>
    //     </>
    // )
}