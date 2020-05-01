import React from "react";
import ButtonForward from "../ButtonForward";
import './styles.css';

function WaitingCorrection({data}) {
    return (
        <div className="waiting-correction">
            <img src={data.subject.icon} className="waiting-correction-icon" alt={data.subject.name}/>
            <h2 className="waiting-correction-title">{data.title}</h2>
            <ButtonForward to={`/activities/${data.activity_id}`} title="Revisar envio"/>
        </div>
    );
}

export default WaitingCorrection;