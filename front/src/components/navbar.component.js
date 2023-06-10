import React, { useEffect, useState } from "react";
import { Link, NavLink  } from "react-router-dom";
import SearchBar from "./searchBar.component";
import './../assets/navbar.css'


function getUser() {
    var tokenString = sessionStorage.getItem('accessToken');
    tokenString = JSON.parse(tokenString)
    return tokenString
}

export default function Navbar(props) {
    const [isLogged, setLogged] = useState(false);

    useEffect(() => {
        sessionStorage.getItem('accessToken');
        let user = getUser();
        if(user != null && user.accessToken.length > 50){
            setLogged(true);
        }else{
            setLogged(false);
        }
    }, []);
    console.log(props.message)
    return (
        <div className="nabarDiv">
          
           <li className="NavLi"> 
                <NavLink to={"/Home"}>Home</NavLink>
            </li>
            {isLogged ?
            <li className="NavLi" id="RigthLi">
                <NavLink to={"/Collection"}>Collection</NavLink>
            </li>
             : null}
             <li className="NavLi" id="RigthLi">
                {/* <NavLink to={"/accueil"}>Sign In</NavLink> */}
                <SearchBar />
            </li> 
            <li className="NavLi" id="RigthLi">
                <NavLink to={"/SignUp"}>Inscription</NavLink>
            </li>
            <li className="NavLi" id="RigthLi">
                <NavLink to={"/Signin"}>Connexion</NavLink>
            </li>
            {isLogged ?
            <li className="NavLi" id="RigthLi">
                <NavLink to={"/Logout"}>Déconnexion</NavLink>
            </li>
            :
            null}
            
        </div>
    );

}