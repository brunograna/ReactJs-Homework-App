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
        async function fetchActivities() {
            try {
                const result = await api.get('/activities/author');
                setActivities(result.data);
            } catch (e) {
                console.error(e);
                alert.show('Algo de errado aconteceu!', {types: types.ERROR});
            }
        }
        fetchActivities();
    }, []);

    return (
        <>
            <h1 className="title">Lista de todas as suas atividades</h1>
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
                <li>
                    <article className='activity-item'>
                        <div>
                            {activityData.explanation ? (
                                <CheckCircleOutlineOutlinedIcon className="recently-corrected-status"/>
                            ) : (
                                <CancelOutlinedIcon className="recently-not-corrected-status"/>
                            )}
                            <span>{activityData.title}</span>
                        </div>
                        <ButtonForward to={`/activities/${activityData.id}`} title={'Ver detalhe'}/>
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
