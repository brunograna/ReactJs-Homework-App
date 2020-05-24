import React, {useEffect, useState} from "react";
import ActivityOutdoor from "../../components/RecentlyCorrected";
import api from "../../services/api";
import {types, useAlert} from "react-alert";

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
            {activities ? activities.map((activityData) => (
                <ActivityOutdoor activity={activityData} actionTitle="Ver detalhes"/>
            )) : (
                <>
                </>
            )}
        </>
    );
}

export default ActivitiesList;
