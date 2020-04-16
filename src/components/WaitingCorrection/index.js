import React from "react";
import Button from "../Button";

function WaitingCorrection({subject, title, activityId}) {
    return (
        <div className="waiting-correction">
            <img src={subject} className="waiting-correction-icon" alt="Icon"/>
            <h2 className="waiting-correction-title">{title}</h2>
            <Button to={`/activities/${activityId}`} title="Revisar envio"/>
        </div>
    );
}

export default WaitingCorrection;