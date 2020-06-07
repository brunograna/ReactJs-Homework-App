import React, {useEffect, useState} from "react";
import {useHistory, useParams} from 'react-router-dom';
import './styles.css';
import CloudOutlinedIcon from "@material-ui/icons/CloudOutlined";
import api from "../../services/api";
import {types, useAlert} from "react-alert";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import ContentLoader from 'react-content-loader'

function ActivityDetail() {
    const {id} = useParams();
    const alert = useAlert();
    const history = useHistory();
    const [activityId] = useState(id);
    const [activity, setActivity] = useState(undefined);
    const [isPhotoOpen, setIsPhotoOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    useEffect(() =>{
        window.scrollTo(0, 0);
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

    const titleLoader = () => (<ContentLoader width="250" height="40" viewBox="0 0 600 60">
        <rect x="25" y="25" rx="3" ry="3" width="70%" height="355" />
    </ContentLoader>);

    const headLoading = () => (<ContentLoader width="300" height="45" viewBox="0 0 600 70">
        <rect x="0" y="0" rx="50" ry="50" width="70" height="70" />
        <rect x="80" y="17" rx="4" ry="4" width="200" height="17" />
        <rect x="80" y="40" rx="3" ry="3" width="150" height="14" />
    </ContentLoader>);

    const contentLoading = () => (<ContentLoader width={'270'} height={'100px'} viewBox="0 0 500 150">
        <rect x="00" y="17" rx="4" ry="4" width="70%" height="17" />
        <rect x="0" y="49" rx="3" ry="3" width="100%" height="14" />
        <rect x="00" y="90" rx="4" ry="4" width="70%" height="17" />
        <rect x="0" y="120" rx="3" ry="3" width="100%" height="14" />
    </ContentLoader>);

    return (
        <>
            <h1 className="title">{activity ? activity.title : titleLoader()}</h1>
            <div className="activity-detail">
                <div className='head'>
                    {activity ? (
                        <>
                            <img className="teacher-image" src={activity.explanation.author.avatar} alt={`${activity.explanation.author.username} avatar`}/>
                            <div className="teacher-details">
                                <h3 className="teacher-name">{activity.explanation.author.username}</h3>
                                <h4 className="teacher-level">{'Monitor'}</h4>
                            </div>
                        </>
                    ) : headLoading()}
                </div>
                <div className="detail">
                    { activity ? (
                        <>
                            <h2 className="activity-title">Sua pergunta:</h2>
                            <p className="activity-content">
                                {activity ? activity.question : 'Carregando a sua pergunta...'}
                            </p>
                            <h2 className="activity-title">Resposta do monitor:</h2>
                            <p className="activity-content">
                                {activity ? activity.explanation.description: 'Carregando a resposta do monitor...'}
                            </p>
                        </>
                    ): contentLoading()}
                </div>
            </div>

            <div className="input-group">
                <span>Fotos anexadas</span>
                <div className='thumbsContainer' id={'activity-detail-thumbs'}>
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
