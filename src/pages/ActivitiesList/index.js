import React, {useEffect, useState} from "react";
import api from "../../services/api";
import {types, useAlert} from "react-alert";
import ButtonForward from "../../components/ButtonForward";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import './styles.css';
import FreeBreakfastOutlinedIcon from '@material-ui/icons/FreeBreakfastOutlined';

function ActivitiesList() {
    const alert = useAlert();
    const [activities, setActivities] = useState([]);

    useEffect(()=> {
        window.scrollTo(0, 0);
        async function fetchActivities() {
            try {
                const result = await api.get('/activities/me');
                setActivities(result.data.data);
            } catch (e) {
                console.error(e);
                alert.show('Algo de errado aconteceu!', {types: types.ERROR});
            }
        }
        fetchActivities();
    }, []);

    return (
        <>
            <h1 className="title">Todas as suas atividades</h1>
            <ul className='activity-list'>
                {activities.length === 0 ? (
                    <h2 id="empty-data">
                        <FreeBreakfastOutlinedIcon id={'empty-icon'}/>
                        <span>
                        Nenhuma atividade registrada
                    </span>
                    </h2>
                ) : (<></>)}
            {activities ? activities.map((activityData) => (
                <li key={activityData.id}>
                    <article className='activity-item'>
                        <div>
                            {activityData.explanation ? (
                                <CheckCircleOutlineOutlinedIcon className="recently-corrected-status" titleAccess={"Atividade corrigida"}/>
                            ) : (
                                <CancelOutlinedIcon className="recently-not-corrected-status" titleAccess={"Atividade não corrigida"}/>
                            )}
                            <span>{activityData.title}</span>
                        </div>
                        <ButtonForward titleAccess={activityData.explanation ? `Ir para atividade` : `Editar atividade`} to={activityData.explanation ? `/activities/${activityData.id}` : `/activities/${activityData.id}/edit`}/>
                    </article>
                </li>
            )) : (
                <>
                </>
            )}
            </ul>
        </>
    );
}

export default ActivitiesList;
