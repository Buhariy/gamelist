import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import SearchBar from "./searchBar.component";
import { FaHome, FaUserEdit } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { ImBooks } from "react-icons/im";
import { IoMenu } from "react-icons/io5"
import './../assets/sidebar.css'


function getUser() {
    var tokenString = sessionStorage.getItem('accessToken');
    tokenString = JSON.parse(tokenString)
    return tokenString
}

export default function Sidebar(props) {
    const [userid, setId] = useState();
    const divRef = useRef(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [MenuSize, setMenuSize] = useState(200);
    const [Display, setDisplay] = useState("inline");
    const [windowSize, setWindowSize] = useState({
        with: window.innerWidth,
        height: window.innerHeight,
    });

    const toggleMenu = () => {
        if (windowSize.with < 800) {
            setOpenMenu(openMenu => !openMenu);
            if (openMenu) {
                setMenuSize(40);
                setDisplay("none");
            }
            else {
                setMenuSize(200);
                setDisplay("inline");
            }
        }
    }

    const handleClickOutside = (event) => {
        if (divRef.current && !divRef.current.contains(event.target) && windowSize.with < 800) {
            setClose();
        }
    };

    const setClose = () => {
        if (windowSize.with < 800) {
            setDisplay("none");
            setMenuSize(40);
            setOpenMenu(false);
        }
    }

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

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };

    }, []);

    return (
        <div ref={divRef} className="sidebar" style={{ width: MenuSize + "px" }}>
            <IoMenu id="menuIcon" onClick={toggleMenu} />
            <ul>
                <li>
                    <NavLink className="iconsidebar" id="linkIconeStyle" to={"/Home"}><FaHome className="iconsidebar" /></NavLink>
                    <NavLink className="linkStyle" onClick={setClose} style={{ display: Display }} to={"/Home"}> Home </NavLink>
                </li>
                <li>
                    <NavLink className="iconsidebar" id="linkIconeStyle" to={"/Top"}><FaArrowTrendUp className="iconsidebar" href="/Home" /></NavLink>
                    <NavLink className="linkStyle" onClick={setClose} style={{ display: Display }} to={"/Top"}> Top 10</NavLink>
                </li>
                {
                    props.isLogged ?
                        <li>
                            <NavLink className="iconsidebar" id="linkIconeStyle" to={"/Collection"}><ImBooks className="iconsidebar" href="/Home" /></NavLink>
                            <NavLink className="linkStyle" onClick={setClose} style={{ display: Display }} to={"/Collection"}> Collection</NavLink>
                        </li>
                        :
                        null
                }

                {
                    props.isLogged ?
                        <li >
                            <NavLink className="iconsidebar" id="linkIconeStyle" to={"/MyProfil/" + userid}><FaUserEdit className="iconsidebar" href="/Home" /></NavLink>
                            <NavLink className="linkStyle" onClick={setClose} style={{ display: Display }} to={"/MyProfil/" + userid}> Mon profile</NavLink>
                        </li>
                        :
                        null
                }
            </ul>
        </div>
    );

}