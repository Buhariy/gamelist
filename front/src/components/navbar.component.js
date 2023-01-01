import { Link } from "react-router-dom";
import SearchBar from "./searchBar.component";
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

            <li>
                {/* <Link to={"/accueil"}>Sign In</Link> */}
                <SearchBar />
            </li>
            <li className="NavLi" id="RigthLi">
                <Link to={"/SignUp"}>Inscription</Link>
            </li>
            <li className="NavLi" id="RigthLi">
                <Link to={"/Signin"}>Connexion</Link>
            </li>
        </div>
    );

}