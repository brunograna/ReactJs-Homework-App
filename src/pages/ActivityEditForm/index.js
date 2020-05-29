import React, {useEffect, useState} from "react";
import './styles.css';
import TextArea from "../../components/TextArea";
import ButtonSubmit from "../../components/ButtonSubmit";
import {useDropzone} from 'react-dropzone';
import ButtonAttachment from "../../components/ButtonAttachment";
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import CloudOutlinedIcon from '@material-ui/icons/CloudOutlined';
import {generateId} from "../../services/util";
import InputText from "../../components/InputText";
import api from "../../services/api";
import {types, useAlert} from "react-alert";
import {useHistory, useParams} from 'react-router-dom';

function ActivityEditForm() {
    const {id} = useParams();
    const alert = useAlert();
    const history = useHistory();
    const [activityId, setAcitivityId] = useState(id);
    const [sendingForm, setSendingForm] = useState(false);
    const [subjects, setSubjects] = useState({options: []});
    const [title, setTitle] = useState('');
    const [subjectKey, setSubjectKey] = useState('');
    const [question, setQuestion] = useState('');
    const [images, setImages] = useState([]);
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        maxSize: 4000000,
        onDrop: acceptedFiles => {
            const newFiles = acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file),
                imageId: generateId(8)
            }));
            const newFilesList = images.concat(newFiles);
            console.log(newFilesList);
            setImages(newFilesList);
        },
        onDropRejected(fileRejections, event) {
            alert("Não foi possivel fazer upload desta imagem. \n Tamanho máximo de 4mb");
        }
    });
    const [hasFailure, setHasFailure] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);

    useEffect(() => {
        async function fetchSubjects() {
            try {
                const result = await api.get('/subjects');
                console.log(result);
                setSubjects({options: result.data});
            } catch (e) {
                console.error(e);
                alert.show('Algo de errado aconteceu!', {types: types.ERROR});
            }
        }
        async function fetchActivity() {
            try {
                const result = await api.get(`/activities/${id}/author`);
                console.log(result);
                setSubjectKey(result.data.subject.key);
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
                setTitle(result.data.title);
                setQuestion(result.data.question);
            } catch (e) {
                console.error(e);
                alert.show('Algo de errado aconteceu!', {types: types.ERROR});
            }
        }
        fetchSubjects();
        fetchActivity();
    }, []);
    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        images.forEach(file => URL.revokeObjectURL(file.preview));
    },  [images]);

    const thumbs = images.map((file, index) => {
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
        const newFilesList = images.filter(elem => elem.imageId !== imageId);
        setImages(newFilesList);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSendingForm(true);
        const formData = new FormData();

        const errorMessage = [];
        if (isNaN(parseInt(subjectKey))) errorMessage.push('O assunto é obrigatório');
        if (title.length === 0) errorMessage.push('O título é obrigatório');
        if (question.length === 0) errorMessage.push('A descrição é obrigatório');
        if (errorMessage.length > 0) {
            setClientErrorMessage(errorMessage);
            setSendingForm(false);
            return;
        }

        formData.append('id', activityId);
        formData.append('title', title);
        formData.append('subjectKey', parseInt(subjectKey));
        formData.append('question', question);
        images.forEach((image) => {
            formData.append('images', image);
        });

        try {
            const response = await api.put(`/activities/${activityId}`, formData);
            console.log(response.headers);
            if (response.status === 204) {
                setTitle('');
                setSubjectKey('');
                setQuestion('');
                setImages([]);
                history.push('/');
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

    return (
        <>
            <h1 className="title">Envio de atividade</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="input-group">
                    <span>Titulo da atividade</span>
                    <InputText name="title"
                               value={title}
                               onChange={e => setTitle(e.target.value)}
                               placeholder="Digite aqui o seu título..." />
                </div>
                <div className="input-group">
                    <span>Selecione um assunto</span>
                    <div className="matter-container">
                        <select name="matter"
                                id="matter"
                                value={subjectKey}
                                onChange={e => setSubjectKey(e.target.value)}
                                className="matter">
                            <option value={0}>Selecione um assunto</option>
                            {subjects.options.map((option) => (
                                <option key={option.key} value={option.key}>{option.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="input-group">
                    <span>Digite aqui comentários sobre a sua dúvida</span>
                    <TextArea name="comment"
                              value={question}
                              onChange={e => setQuestion(e.target.value)}
                              placeholder="Digite aqui o seu comentário..." />
                </div>
                <div className="input-group dropzone-container">
                    <span>Caso queira, você também pode anexar fotos</span>
                    <div {...getRootProps({className: 'dropzone activity-addphoto'})}>
                        <input {...getInputProps()} />
                        <ButtonAttachment title="Adicionar nova foto"/>
                    </div>
                </div>
                <div className="input-group">
                    <span>Fotos anexadas</span>
                    <div className='thumbsContainer'>
                        {images.length === 0 ? (
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
                <ButtonSubmit disabled={sendingForm} title={sendingForm ? 'Enviando...' : 'Atualizar atividade'}/>
            </form>
        </>
    );
}

export default ActivityEditForm;
