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

function ActivityForm() {
    const alert = useAlert();
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
            setImages(newFilesList);
        },
        onDropRejected(fileRejections, event) {
            alert("Não foi possivel fazer upload desta imagem. \n Tamanho máximo de 4mb");
        }
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await api.get('/subjects');
                console.log(result);
                setSubjects({options: result.data});
            } catch (e) {
                console.error(e);
                alert.show('Algo de errado aconteceu!', {types: types.ERROR});
            }
        }
        fetchData();
    }, []);
    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        images.forEach(file => URL.revokeObjectURL(file.preview));
    },  [images]);

    const thumbs = images.map(file => {
        return (
            <div className='thumb' key={file.imageId} onClick={() => removeImage(file.imageId)}>
                <div className='thumbInner'>
                    <img
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
        const formData = new FormData();

        formData.append('title', title);
        formData.append('subjectKey', parseInt(subjectKey));
        formData.append('question', question);
        images.forEach((image) => {
            formData.append('images', image);
        });

        const response = await api.post('/activities', formData);
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
                <ButtonSubmit title={'Enviar Atividade'}/>
            </form>
        </>
    );
}

export default ActivityForm;
