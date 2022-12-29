import { Link } from "react-router-dom";
import './../assets/navbar.css'
export default function Navbar() {
    return (
        <div className="nabarDiv">
            <li className="NavLi">
                <Link to={"/Home"}>Home</Link>
            </li>
            <li className="NavLi">
                <Link to={"/Collection"}>Collection</Link>
            </li>
            {/*
        <li>
            <Link to={"/accueil"}>Sign In</Link>
        </li>*/}
            <li className="NavLi" id="RigthLi">
                <Link to={"/SignUp"}>Sign Up</Link>
            </li>
            <li className="NavLi" id="RigthLi">
                <Link to={"/Signin"}>Sign In</Link>
            </li>
        </div>
    );

}