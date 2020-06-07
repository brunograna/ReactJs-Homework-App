import React, {useEffect, useState} from "react";
import api from "../../services/api";
import {types, useAlert} from "react-alert";
import './styles.css';
import FreeBreakfastOutlinedIcon from '@material-ui/icons/FreeBreakfastOutlined';
import WaitingCorrection from "../../components/WaitingCorrection";
import Paginator from "../../components/Paginator";

function ActivitiesAvailable() {
    const alert = useAlert();
    const [activities, setActivities] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [hasPrev, setHasPrev] = useState(false);
    const [hasNext, setHasNext] = useState(false);


    useEffect(()=> {
        window.scrollTo(0, 0);
        async function fetchActivities() {
            try {
                const result = await api.get(`/activities?page=${currentPage}&per_page=${5}&include_me=${false}&with_explanation=${false}`);
                const {page, totalPages, data} = result.data;
                setActivities(data);
                setTotalPages(totalPages);

                if (currentPage === totalPages) setHasNext(false);
                else setHasNext(true);

                if (currentPage === 1) setHasPrev(false);
                else setHasPrev(true);
            } catch (e) {
                console.error(e);
                alert.show('Algo de errado aconteceu!', {types: types.ERROR});
            }
        }
        fetchActivities();
    }, [currentPage]);

    function handleNext() {
        if (currentPage !== totalPages) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
        }
    }

    function handlePrev() {
        if (currentPage !== 1) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
        }
    }

    return (
        <>
            <h1 className="title">Atividades disponíveis para correção</h1>
            <ul className='activity-list'>
                {activities.length === 0 ? (
                    <h2 id="empty-data">
                        <FreeBreakfastOutlinedIcon id={'empty-icon'}/>
                        <span>
                        Nenhuma atividade disponível
                    </span>
                    </h2>
                ) : (<></>)}
            {activities ? activities.map((activityData) => (
                <li key={activityData.id}>
                    <WaitingCorrection titleAccess={'Corrigir atividade'} linkToExplanation={true} activity={activityData} />
                </li>
            )) : (
                <>
                </>
            )}
            </ul>
            <Paginator
                onNext={handleNext} hasNext={hasNext}
                onPrev={handlePrev} hasPrev={hasPrev}
            />
        </>
    );
}

export default ActivitiesAvailable;
