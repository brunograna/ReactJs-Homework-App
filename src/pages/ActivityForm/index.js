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

    const [files, setFiles] = useState([]);
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        maxSize: 4000000,
        onDrop: acceptedFiles => {
            const newFiles = acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file),
                imageId: generateId(8)
            }));
            const newFilesList = files.concat(newFiles);
            setFiles(newFilesList);
        },
        onDropRejected(fileRejections, event) {
            alert("Não foi possivel fazer upload desta imagem. \n Tamanho máximo de 4mb");
        }
    });

    function removeImage(imageId) {
        const newFilesList = files.filter(elem => elem.imageId !== imageId);
        setFiles(newFilesList);
    }

    const thumbs = files.map(file => {
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

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    },  [files]);

    return (
        <>
            <h1 className="title">Envio de atividade</h1>
            <form action="">
                <div className="input-group">
                    <span>Titulo da atividade</span>
                    <InputText name="title" placeholder="Digite aqui o seu título..." />
                </div>
                <div className="input-group">
                    <span>Selecione um assunto</span>
                    <div className="matter-container">
                        <select name="matter" id="matter" className="matter">
                            <option>Selecione um assunto</option>
                            {subjects.options.map((option) => (
                                <option key={option.key} value={option.key}>{option.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="input-group">
                    <span>Digite aqui comentários sobre a sua dúvida</span>
                    <TextArea name="comment" placeholder="Digite aqui o seu comentário..." />
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
                        {files.length === 0 ? (
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
