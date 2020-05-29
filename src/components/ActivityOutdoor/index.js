import ButtonForward from "../ButtonForward";
import React from "react";
import './styles.css';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

function ActivityOutdoor({activity, actionTitle}) {
    return (
        <article className="recently-corrected">
            <div className='head'>
                <img className="teacher-image" src={activity.explanation ? activity.explanation.author.avatar : activity.author.avatar} alt="Teacher"/>
                <div className="teacher-details">
                    <h3 className="teacher-name">{activity.explanation ? activity.explanation.author.username : activity.author.username}</h3>
                    <h4 className="teacher-level">{activity.explanation ? 'Monitor' : 'Você'}</h4>
                </div>
                {activity.explanation ? (
                    <CheckCircleOutlineOutlinedIcon className="recently-corrected-status"/>
                ) : (
                    <CancelOutlinedIcon className="recently-not-corrected-status"/>
                )}
                {/*<img className="recently-corrected-status" src={Success} alt="Activity Status"/>*/}
            </div>
            <section className="activity-briefing">
                <h1 className="activity-briefing-title">{activity.title}</h1>
                <p className="activity-briefing-content">{activity.explanation ? activity.explanation.description : activity.question}</p>
            </section>
            <footer className="activity-actions">
                <ButtonForward className="activity-goto" to={`/activities/${activity.id}`} title={actionTitle ? actionTitle : 'Ver correção'}></ButtonForward>
            </footer>
        </article>
    );
}

export default ActivityOutdoor;