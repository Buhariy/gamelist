import React from "react";
import './../assets/cards.css'
export default function CardGame(props) {
    return(
    <div class="card" key={props.id}>
        {/* <Image src="img_avatar.png" alt="Avatar" style="width:100%"> */}
        <img src={props.link} alt={props.name} />
            <div class="container">
                <h4><b id="acontainer">{props.name}</b></h4>
            </div>
    </div>
    );
}