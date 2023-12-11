import React, { useEffect, useState } from "react";
import { Link, NavLink  } from "react-router-dom";
import SearchBar from "./searchBar.component";
import './../assets/navbar.css';


function getUser() {
    var tokenString = sessionStorage.getItem('accessToken');
    tokenString = JSON.parse(tokenString)
    return tokenString
}

export default function Navbar(props) {
    const [userid,setId] = useState();
    
    useEffect(() => {
        let user = getUser();
        if(user == "")
            setId("")
        else if(user != null)
            setId(user.id)
    }, []);

    return (
        <div className="nabarDiv">
          
           <li className="NavLi"> 
                <NavLink to={"/Home"}>Home</NavLink>
            </li>
            {props.isLogged ?
            <li className="NavLi" id="RigthLi">
                <NavLink to={"/Collection"}>Collection</NavLink>
            </li>
             : null}
             <li className="NavLi" id="RigthLi">
                {/* <NavLink to={"/accueil"}>Sign In</NavLink> */}
                <SearchBar />
            </li> 
            {props.isLogged ?
                null :
            <li className="NavLi" id="RigthLi">
                <NavLink to={"/SignUp"}>Inscription</NavLink>
            </li>}
            {props.isLogged ?
                null :
            <li className="NavLi" id="RigthLi">
                <NavLink to={"/Signin"}>Connexion</NavLink>
            </li>}
            {props.isLogged ?
            <li className="NavLi" id="RigthLi">
                <NavLink to={"/Logout"}>Déconnexion</NavLink>
            </li>
            :
            null}
            {
                props.isLogged ?
                <li className="NavLi" id="Le">
                    <NavLink to={"/MyProfil/"+userid}>Mon profile</NavLink>
                </li>
                :
                null
            }
        </div>
    );

}