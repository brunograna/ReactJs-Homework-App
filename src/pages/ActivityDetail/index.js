import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import './styles.css';
import CloudOutlinedIcon from "@material-ui/icons/CloudOutlined";

function ActivityDetail() {
    const {id} = useParams();
    const [activityId, setActivityId] = useState(id);

    useEffect(() =>{

    }, [activityId]);

    return (
        <>
            <h1 className="title">Detalhes sobre a atividade</h1>

            <div className="activity-detail">
                <div className='head'>
                    <img className="teacher-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQNTjHSbM5Dv-1l3lWfo-xe-r7LeUtGVNypni0O7enY0EHLS8Pw&usqp=CAU" alt="Teacher"/>
                    <div className="teacher-details">
                        <h3 className="teacher-name">Megan Fox</h3>
                        <h4 className="teacher-level">Monitora</h4>
                    </div>
                </div>
                <div className="detail">
                    <h2 className="activity-title">Sua pergunta:</h2>
                    <p className="activity-content">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                        veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                    </p>
                    <h2 className="activity-title">Resposta do monitor:</h2>
                    <p className="activity-content">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                        veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam

                        voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
                        magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                        qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non
                        numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                        Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam,
                    </p>
                </div>
            </div>

            <div className="input-group">
                <span>Fotos anexadas</span>
                <div className='thumbsContainer'>
                    <div className='no-content'>
                        <CloudOutlinedIcon className='cloud-icon' />
                        <p>Nenhuma foto foi anexada</p>
                    </div>
                </div>
            </div>

        </>
    );
}

export default ActivityDetail;
