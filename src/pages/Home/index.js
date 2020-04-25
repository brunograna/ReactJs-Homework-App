import React from "react";
import Math from '../../icons/subjects/math.svg';
import Portuguese from '../../icons/subjects/portuguese.svg';
import Success from '../../icons/status/success.svg';
import './styles.css';
import WaitingCorrection from "../../components/WaitingCorrection";
import Button from "../../components/Button";

function Home() {
    return (
        <>
            <h1 className="title">Aguardando correção</h1>
            <WaitingCorrection title="Nome da atividade" activityId={2} subject={Math} />
            <WaitingCorrection title="Nome da atividade" activityId={2} subject={Portuguese} />

            <h1 className="title">Recentemente Corrigidas</h1>
            <article className="recently-corrected">
                <head>
                    <img className="teacher-image" src="https://i0.wp.com/www.passejaconcurseiro.com.br/wp-content/uploads/2017/03/opulent-profile-square-06-1.jpg?ssl=1" alt="Teacher"/>
                    <div className="teacher-details">
                        <h3 className="teacher-name">Megan Fox</h3>
                        <h4 className="teacher-level">Monitor</h4>
                    </div>
                    <img className="recently-corrected-status" src={Success} alt="Activity Status"/>
                </head>
                <section className="activity-briefing">
                    <h1 className="activity-briefing-title">Titulo da Atividade</h1>
                    <p className="activity-briefing-content">Aqui entra uma pequena descrição do que a monitora Megan Fox escreveu e você ...</p>
                </section>
                <footer className="activity-actions">
                    <Button className="activity-goto" to="/link" title="Ver detalhes"></Button>
                </footer>
            </article>
        </>
    );
}

export default Home;