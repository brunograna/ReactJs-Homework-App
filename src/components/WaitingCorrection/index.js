import React from "react";
import ButtonForward from "../ButtonForward";
import './styles.css';

function WaitingCorrection({activity, titleAccess, linkToExplanation}) {
    return (
        <div className="waiting-correction">
            <img title={activity.subject.name} src={activity.subject.iconUrl} className="waiting-correction-icon" alt={activity.subject.name}/>
            <h2 className="waiting-correction-title">{activity.title}</h2>
            <ButtonForward titleAccess={titleAccess} to={linkToExplanation ? `/activities/${activity.id}/explanation` : `/activities/${activity.id}/edit`}/>
        </div>
    );
}

export default WaitingCorrection;