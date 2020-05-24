import React from "react";
import ButtonForward from "../ButtonForward";
import './styles.css';

function WaitingCorrection({activity}) {
    return (
        <div className="waiting-correction">
            <img src={activity.subject.iconUrl} className="waiting-correction-icon" alt={activity.subject.name}/>
            <h2 className="waiting-correction-title">{activity.title}</h2>
            <ButtonForward to={`/activities/${activity.id}/edit`} title="Revisar envio"/>
        </div>
    );
}

export default WaitingCorrection;