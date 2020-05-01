import React from "react";
import './styles.css';
import TextArea from "../../components/TextArea";
import Select from "../../components/Select";

function ActivityForm() {
    function mockSelectData() {
        return {
            options: [
                {
                    label: 'Português',
                    value: 1
                },
                {
                    label: 'Matemática',
                    value: 2
                }
            ]
        };
    }

    return (
        <>
            <h1 className="title">Envio de atividade</h1>
            <form action="">
                <div className="input-group">
                    <span>Selecione um assunto</span>
                    <Select data={mockSelectData()} name="matter" id="matter"/>
                </div>
                <div className="input-group">
                    <span>Digite aqui comentários sobre a sua dúvida</span>
                    <TextArea name="comment" placeholder="Digite aqui o seu comentário..." />
                </div>
            </form>
        </>
    );
}

export default ActivityForm;