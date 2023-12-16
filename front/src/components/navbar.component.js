import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import SearchBar from "./searchBar.component";
import { FaHome, FaSearch } from "react-icons/fa";
import { MdLogout, MdLogin } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa6";
import './../assets/navbar.css';

function getUser() {
    var tokenString = sessionStorage.getItem('accessToken');
    tokenString = JSON.parse(tokenString)
    return tokenString
}

export default function Navbar(props) {
    const [userid, setId] = useState();
    const [windowSize, setWindowSize] = useState({
        with: window.innerWidth,
        height: window.innerHeight,
    });


    useEffect(() => {
        let user = getUser();
        if (user == "")
            setId("");
        else if (user != null)
            setId(user.id);

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        };
    }, []);

    return (
        <div className="nabarDiv">
            <div class="search-box" style={{ marginRight: "70px" }}>
                <button className="btn-search"><FaSearch /></button>
                <SearchBar type="text" placeholder="Type to Search..." />
            </div>
            {
                !props.isLogged ?
                    windowSize.height > 768 ?
                        <button className="btnCTA">
                            <NavLink className="navlinkStyle" to={"/SignUp"}>Inscription</NavLink>
                        </button>
                        :
                        <button className="btn-login input-search" style={{ marginRight: "45px" }}>
                            <NavLink to={"/SignUp"}><FaUserPlus /></NavLink>
                        </button>
                    :
                    null
            }


            {
                !props.isLogged ?
                    windowSize.height > 768 ?
                        <button className="btnCTA">
                            <NavLink className="navlinkStyle" to={"/Signin"}>Connexion</NavLink>
                        </button>
                        :
                        <button className="btn-login input-search">
                            <NavLink to={"/Signin"}><MdLogin /></NavLink>
                        </button>
                    :
                    null
            }




            {
                props.isLogged ?
                    windowSize.height > 768 ?
                        <button className="btnCTA">
                            <NavLink className="navlinkStyle" to={"/Logout"}>Déconnexion</NavLink>
                        </button>
                        :
                        <button className="btn-login input-search">
                            <NavLink to={"/Logout"}><MdLogout /></NavLink>
                        </button>
                    :
                    null
            }
        </div>
    );

}