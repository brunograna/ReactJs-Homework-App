import React from "react";
import Math from '../../icons/subjects/math.svg';
import Portuguese from '../../icons/subjects/portuguese.svg';
import './styles.css';
import WaitingCorrection from "../../components/WaitingCorrection";

function Home() {
    return (
        <>
            <h1 className="title">Aguardando correção</h1>
            <WaitingCorrection title="Nome da atividade" activityId={2} subject={Math} />
            <WaitingCorrection title="Nome da atividade" activityId={2} subject={Portuguese} />
        </>
    );
}

export default Home;