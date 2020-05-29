import React, {useEffect, useState} from "react";
import {useHistory, useParams} from 'react-router-dom';
import './styles.css';
import CloudOutlinedIcon from "@material-ui/icons/CloudOutlined";
import api from "../../services/api";
import {types, useAlert} from "react-alert";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

function ActivityDetail() {
    const {id} = useParams();
    const alert = useAlert();
    const history = useHistory();
    const [activityId] = useState(id);
    const [activity, setActivity] = useState(undefined);
    const [isPhotoOpen, setIsPhotoOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    useEffect(() =>{
        async function fetchActivity() {
            try {
                const result = await api.get(`/activities/${activityId}`);
                if (!result.data.explanation) {
                    alert.show('Atividade ainda não foi respondida!', {types: types.INFO});
                    history.push('/');
                }
                setActivity(result.data);
            } catch (e) {
                console.error(e);
                alert.show('Algo de errado aconteceu!', {types: types.ERROR});
            }
        }
        fetchActivity();
    }, [activityId]);

    function viewImage(image, index) {
        setIsPhotoOpen(true);
        setPhotoIndex(index);
        return undefined;
    }

    return (
        <>
            <h1 className="title">{activity ? activity.title : ''}</h1>

            <div className="activity-detail">
                <div className='head'>
                    <img className="teacher-image" src={activity ? activity.explanation.author.avatar : ''} alt="Teacher avatar"/>
                    <div className="teacher-details">
                        <h3 className="teacher-name">{activity ? activity.explanation.author.username: 'Carregando'}</h3>
                        <h4 className="teacher-level">Monitor</h4>
                    </div>
                </div>
                <div className="detail">
                    <h2 className="activity-title">Sua pergunta:</h2>
                    <p className="activity-content">
                        {activity ? activity.question : 'Carregando a sua pergunta...'}
                    </p>
                    <h2 className="activity-title">Resposta do monitor:</h2>
                    <p className="activity-content">
                        {activity ? activity.explanation.description: 'Carregando a resposta do monitor...'}
                    </p>
                </div>
            </div>

            <div className="input-group">
                <span>Fotos anexadas</span>
                <div className='thumbsContainer'>
                    {activity ? (
                            activity.images.length === 0 ? (
                                <div className='no-content'>
                                    <CloudOutlinedIcon className='cloud-icon' />
                                    <p>Nenhuma foto foi anexada</p>
                                </div>
                            ) : (
                                activity.images.map((image, index) => (
                                    <div className='thumb' key={index} onClick={() => viewImage(image, index)}>
                                        <div className='thumbInner' style={{cursor: 'pointer'}}>
                                            <img
                                                alt={`Anexo auxiliar ${index}`}
                                                src={image}
                                                className='img-preview'
                                            />
                                        </div>
                                    </div>
                            )))
                    ) : (
                        <div className='no-content'>
                            <CloudOutlinedIcon className='cloud-icon' />
                            <p>Nenhuma foto foi anexada</p>
                        </div>
                    )}

                </div>
            </div>

            {isPhotoOpen && (
                <Lightbox
                    mainSrc={activity.images[photoIndex]}
                    nextSrc={activity.images[(photoIndex + 1) % activity.images.length]}
                    prevSrc={activity.images[(photoIndex + activity.images.length - 1) % activity.images.length]}
                    onCloseRequest={() => setIsPhotoOpen(false)}
                    onMovePrevRequest={() =>
                        setPhotoIndex((photoIndex + activity.images.length - 1) % activity.images.length)
                    }
                    onMoveNextRequest={() =>
                        setPhotoIndex((photoIndex + 1) % activity.images.length)
                    }

                />
            )}
        </>
    );
}

export default ActivityDetail;
