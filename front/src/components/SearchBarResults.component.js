import React,{useEffect,useState} from "react";
import { useLocation } from "react-router-dom";
import CardGame from "./cardGame.component";

function getUser() {
    var tokenString = sessionStorage.getItem('accessToken');
    tokenString = JSON.parse(tokenString)
    return tokenString;
}

export default function SearchBarResults(){
    const location = useLocation();
    const [isLogged, setLogged] = useState(false);

    useEffect(()=> {
        const searchData = location.state?.data[0];
        let user = getUser();
        if (user != null && user.accessToken.length > 50) {
            setLogged(true);
        } else {
            setLogged(false);
        }
    },[location.state]);

    return(
        <div>
            {location.state?.data && (
                <>
                    {isLogged  ?
                        <CardGame key={location.state.data[0].id} name={location.state.data[0].name} link={location.state.data[0].box_art_url} gameId={location.state.data[0].id} />
                        :
                        <CardGame key={location.state.data[0].id} name={location.state.data[0].name} link={location.state.data[0].box_art_url} gameId={location.state.data[0].id} NoIcon={true} />
                    }
                </>
            )}
            
        </div>
    )
}