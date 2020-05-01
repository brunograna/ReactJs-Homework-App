import Success from "../../icons/status/success.svg";
import ButtonForward from "../ButtonForward";
import React from "react";
import './styles.css';

function RecentlyCorrected({data}) {
    return (
        <article className="recently-corrected">
            <head>
                <img className="teacher-image" src={data.teacher.image} alt="Teacher"/>
                <div className="teacher-details">
                    <h3 className="teacher-name">{data.teacher.name}</h3>
                    <h4 className="teacher-level">{data.teacher.level}</h4>
                </div>
                <img className="recently-corrected-status" src={Success} alt="Activity Status"/>
            </head>
            <section className="activity-briefing">
                <h1 className="activity-briefing-title">{data.activity.title}</h1>
                <p className="activity-briefing-content">{data.activity.briefing}</p>
            </section>
            <footer className="activity-actions">
                <ButtonForward className="activity-goto" to={`/link/${data.activity.id}`} title="Ver detalhes"></ButtonForward>
            </footer>
        </article>
    );
}

export default RecentlyCorrected;