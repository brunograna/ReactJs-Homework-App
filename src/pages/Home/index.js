import React, {useEffect, useState} from "react";
import './styles.css';
import WaitingCorrection from "../../components/WaitingCorrection";
import ActivityOutdoor from "../../components/ActivityOutdoor";
import api from "../../services/api";
import {types, useAlert} from "react-alert";
import FreeBreakfastOutlinedIcon from "@material-ui/icons/FreeBreakfastOutlined";

function Home() {
    const alert = useAlert();
    const [activitiesWithoutAnswer, setActivitiesWithoutAnswer] = useState([]);
    const [activitiesWithAnswer, setActivitiesWithAnswer] = useState([]);

    useEffect(()=> {
        async function fetchActivitiesWithoutAnswer() {
            try {
                const result = await api.get('/activities/author?with_explanation=false');
                setActivitiesWithoutAnswer(result.data);
            } catch (e) {
                console.error(e);
                alert.show('Algo de errado aconteceu!', {types: types.ERROR});
            }
        }
        async function fetchActivitiesWithAnswer() {
            try {
                const result = await api.get('/activities/author?with_explanation=true');
                setActivitiesWithAnswer(result.data);
            } catch (e) {
                console.error(e);
                alert.show('Algo de errado aconteceu!', {types: types.ERROR});
            }
        }
        fetchActivitiesWithoutAnswer();
        fetchActivitiesWithAnswer();
    }, []);

    return (
        <>
            {activitiesWithoutAnswer.length > 0 ? (
                <h1 className="title">Aguardando correção</h1>
            ): (<></>)}
            {activitiesWithoutAnswer.map((activityWithoutAnswerData) => (
                <WaitingCorrection activity={activityWithoutAnswerData} />
            ))}

            <h1 className="title">Suas atividades corrigidas</h1>
            {activitiesWithAnswer.length === 0 ? (
                <h2 id="empty-data">
                    <FreeBreakfastOutlinedIcon id={'empty-icon'}/>
                    <span>
                        Nenhuma atividade registrada
                    </span>
                </h2>
            ): (<></>)}
            {activitiesWithAnswer.map((activitiesWithAnswerData) => (
                <ActivityOutdoor activity={activitiesWithAnswerData}/>
            ))}

        </>
    );
}

export default Home;