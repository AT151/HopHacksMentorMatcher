import React, {useState} from 'react';
import './Card.css';
import Modal from './Modal'
import './Modal.css'

var webhook = "https://discordapp.com/api/webhooks/737991835598716989/EhWfJT1NGgpWtdDAhZ-iFwkAgpQGB5CEDQCrIFKlVNPyLllVKMLRQNRGjhChCqC6Elwt"



function Card(props) {
    const modalRef = React.useRef();
    const openModal = () => modalRef.current.openModal();
    const closeModal = () => modalRef.current.closeModal();

    const [discTag, setTag] = useState("");
    const handleTag = event => setTag(event.target.value);

    const [issue, setIssue] = useState("");
    const handleIssue = event => setIssue(event.target.value);

    const [respMessage, setResponse] = useState("");

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
    var cssClass = (props.status === 'online') ? 'card' : 'card-offline';
    var onClickAvailability = (props.status === 'online') ? openModal : "";
    return(
        <div className={cssClass}>
            <div className="container" onClick={onClickAvailability}>
                <h4><b>Name: {props.name}</b></h4>
                <p>Organization: {props.organization}</p>
                <p>Skills: {props.skills}</p>
            </div>
            <Modal ref={modalRef}>
                <h4>Discord Handle:</h4>
                <input type="text" value = {discTag} onChange={handleTag}/>
                <h4>Issue:</h4>
                <textarea rows="4" cols="50" value = {issue} onChange={handleIssue}/>
                <h3>{respMessage}</h3>
                {/* <button onClick={closeModal}>Cancel</button> */}
                <button onClick={async() => {
                    const reminder = "\n\nWe would advise you to change your status to invisble while working with a mentee to avoid additional requests." 
                        + "\nPlease return your status to online once you are done."
                    var output = discTag + ";" + issue + reminder + ";" + props.discord;
                    await fetch(webhook, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({content:output})
                    })
                    var tagSplit = discTag.split("#");
                    var serv = "http://localhost:5000/mentorRequest?name=" + tagSplit[0] + "&disc=" + tagSplit[1];
                    await fetch(serv)
                        .then(response => response.json())
                        .then(data => setResponse(data.conf));       
                }}>Submit</button>
            </Modal>
        </div>
    );
}

export default Card;