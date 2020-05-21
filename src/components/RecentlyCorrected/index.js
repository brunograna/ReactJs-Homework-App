import Success from "../../assets/status/success.svg";
import ButtonForward from "../ButtonForward";
import React from "react";
import './styles.css';

function ActivityOutdoor({data, actionTitle}) {
    return (
        <article className="recently-corrected">
            <div className='head'>
                <img className="teacher-image" src={data.teacher.image} alt="Teacher"/>
                <div className="teacher-details">
                    <h3 className="teacher-name">{data.teacher.name}</h3>
                    <h4 className="teacher-level">{data.teacher.level}</h4>
                </div>
                <img className="recently-corrected-status" src={Success} alt="Activity Status"/>
            </div>
            <section className="activity-briefing">
                <h1 className="activity-briefing-title">{data.activity.title}</h1>
                <p className="activity-briefing-content">{data.activity.briefing}</p>
            </section>
            <footer className="activity-actions">
                <ButtonForward className="activity-goto" to={`/activities/${data.activity.id}`} title={actionTitle ? actionTitle : 'Ver correção'}></ButtonForward>
            </footer>
        </article>
    );
}

export default ActivityOutdoor;