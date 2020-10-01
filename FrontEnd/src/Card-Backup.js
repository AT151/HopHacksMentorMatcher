import React, {useState} from 'react';
import './Card.css';
import Modal from './Modal'

var webhook = "https://discordapp.com/api/webhooks/737991835598716989/EhWfJT1NGgpWtdDAhZ-iFwkAgpQGB5CEDQCrIFKlVNPyLllVKMLRQNRGjhChCqC6Elwt"

function Card(props) {

    const[isShowing, setIsShowing] = useState(false);
    const toggle = () => setIsShowing(!isShowing);
    
    const sendData = async() => {
        await fetch(webhook, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({content:props.discord})
        })
    }

    return(
        <div className={"card"}>
            <div className="container" onClick={async() => {sendData()}}>
                <h4><b>Name: {props.name}</b></h4>
                <p>Discord: {props.discord}</p>
                <p>Skills: {props.skills}</p>
            </div>
        </div>
    );
}

export default Card;