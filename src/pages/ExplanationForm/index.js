import React, {useEffect, useState} from "react";
import '../ActivityForm/styles.css';
import TextArea from "../../components/TextArea";
import ButtonSubmit from "../../components/ButtonSubmit";
import CloudOutlinedIcon from '@material-ui/icons/CloudOutlined';
import {generateId} from "../../services/util";
import InputText from "../../components/InputText";
import api from "../../services/api";
import {types, useAlert} from "react-alert";
import {useHistory, useParams} from 'react-router-dom';
import ContentLoader from "react-content-loader";
import {getDecodedToken} from "../../services/auth";
import Lightbox from "react-image-lightbox";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import {useDropzone} from "react-dropzone";
import ButtonAttachment from "../../components/ButtonAttachment";

function ExplanationForm() {
    const {id} = useParams();
    const alert = useAlert();
    const history = useHistory();

    const [sendingForm, setSendingForm] = useState(false);
    const [activity, setActivity] = useState();
    const [activityId, setAcitivityId] = useState(id);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [hasFailure, setHasFailure] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);
    const [isPhotoOpen, setIsPhotoOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [explanationImages, setExplanationImages] = useState([]);
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        maxSize: 4000000,
        onDrop: acceptedFiles => {
            const newFiles = acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file),
                imageId: generateId(8)
            }));
            const newFilesList = explanationImages.concat(newFiles);
            setExplanationImages(newFilesList);
        },
        onDropRejected(fileRejections, event) {
            alert.show("Não foi possivel fazer upload desta imagem. \n Tamanho máximo de 4mb");
        }
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        async function fetchActivity() {
            try {
                const result = await api.get(`/activities/${id}`);
                if (result.data.explanation) {
                    alert.show('Esta atividade já foi respondida');
                    history.push('/activities-available');
                }
                if (result.data.author.id === getDecodedToken().sub) {
                    alert.show('Você não pode responder a sua própria atividade');
                    history.push('/');
                }
                const imageArray = [];
                for (const imagePath of result.data.images) {
                    const imagePreview = imagePath
                    const fileName = imagePath.substring(imagePath.lastIndexOf('/') + 1);
                    const blob = await (await fetch(imagePath)).blob();
                    const file = new File([blob], fileName, {type: 'image/png'});
                    let fileAssigned = Object.assign(file, {imageId: generateId(8), preview: imagePreview});
                    imageArray.push(fileAssigned);
                }
                setImages(imageArray);
                setActivity(result.data);
            } catch (e) {
                console.error(e);
                alert.show('Algo de errado aconteceu!', {types: types.ERROR});
            }
        }
        fetchActivity();
    }, []);

    const thumbs = explanationImages.map(file => {
        return (
            <div className='thumb' key={file.imageId} onClick={() => removeImage(file.imageId)}>
                <div className='thumbInner'>
                    <img
                        alt={'Thumbnail preview'}
                        src={file.preview}
                        className='img-preview'
                    />
                    <DeleteOutlineOutlinedIcon className='thumb-delete'/>
                </div>
            </div>
        )
    });

    function removeImage(imageId) {
        const newFilesList = explanationImages.filter(elem => elem.imageId !== imageId);
        setExplanationImages(newFilesList);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSendingForm(true);

        const errorMessage = [];
        if (title.length === 0) errorMessage.push('O título é obrigatório');
        if (description.length === 0) errorMessage.push('A descrição é obrigatória');
        if (errorMessage.length > 0) {
            setClientErrorMessage(errorMessage);
            setSendingForm(false);
            return;
        }
        const formData = new FormData();
        formData.append('title', title);
        formData.append('activityId', activityId);
        formData.append('description', description);
        explanationImages.forEach((image) => {
            formData.append('images', image);
        });

        try {
            const response = await api.post(`/explanations`, formData);
            console.log(response.headers);
            if (response.status === 201) {
                setTitle('');
                setDescription('');
                alert.show("Parabéns! Você acabou de enviar uma explicação!", {type: types.SUCCESS});
                history.push(`/activities/${activityId}`);
            }

        } catch (e) {
            console.error(e);
            if (e.response && e.response.status === 400) {
                setClientErrorMessage(e.response.data.detail);
            } else {
                alert.show('Algo de errado aconteceu!', {type: types.ERROR});
            }
        }
        setSendingForm(false);
    }

    function viewImage(image, index) {
        setIsPhotoOpen(true);
        setPhotoIndex(index);
        return undefined;
    }

    function isWithFailure() {
        return hasFailure === true ? 'has-failure' : 'hide';
    }

    function setClientErrorMessage(message) {
        setHasFailure(true);
        if (!Array.isArray(message)) {
            message = [message];
        }
        const messageTranslated = message.map((message) =>
            message.replace('title', 'titulo')
                    .replace('question', 'descrição')
                    .replace('subjectKey', 'assunto'));
        setErrorMessage(messageTranslated);
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
                            <img className="teacher-image" src={activity.author.avatar} alt={`${activity.author.username} avatar`}/>
                            <div className="teacher-details">
                                <h3 className="teacher-name">{activity.author.username}</h3>
                                <h4 className="teacher-level">{'Aluno'}</h4>
                            </div>
                        </>
                    ) : headLoading()}
                </div>
                <div className="detail">
                    { activity ? (
                        <>
                            <h2 className="activity-title">Pergunta do aluno:</h2>
                            <p className="activity-content">
                                {activity ? activity.question : 'Carregando a sua pergunta...'}
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
            <h2 className="title">{'Informe detalhes sobre a sua explicação'}</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="input-group">
                    <span>Titulo da explicação</span>
                    <InputText name="title"
                               value={title}
                               onChange={e => setTitle(e.target.value)}
                               placeholder="Digite aqui o seu título..." />
                </div>
                <div className="input-group">
                    <span>Digite aqui a sua explicação</span>
                    <TextArea name="comment"
                              value={description}
                              onChange={e => setDescription(e.target.value)}
                              placeholder="Digite aqui o seu comentário..." />
                </div>
                <div className="input-group dropzone-container">
                    <span>Anexar fotos pode ajudar na explicação</span>
                    <div {...getRootProps({className: 'dropzone activity-addphoto'})}>
                        <input {...getInputProps()} />
                        <ButtonAttachment title="Adicionar nova foto"/>
                    </div>
                </div>
                <div className="input-group">
                    <span>Fotos anexadas</span>
                    <div className='thumbsContainer'>
                        {explanationImages.length === 0 ? (
                            <div className='no-content'>
                                <CloudOutlinedIcon className='cloud-icon' />
                                <p>Nenhuma foto foi anexada ainda</p>
                            </div>
                        ) : thumbs}
                    </div>
                </div>
                <div className={`error-message ${isWithFailure()}`}>
                    {
                        errorMessage.map((message) => (
                            <span key={message}>{message}</span>
                        ))
                    }
                </div>
                <ButtonSubmit disabled={sendingForm} title={sendingForm ? 'Enviando...' : 'Enviar explicação'}/>
            </form>
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

export default ExplanationForm;
