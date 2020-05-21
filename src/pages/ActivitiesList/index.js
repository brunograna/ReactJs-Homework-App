import React from "react";
import ActivityOutdoor from "../../components/RecentlyCorrected";

function ActivitiesList() {

    function mockRecentlyCorrected() {
        return {
            teacher: {
                image: 'https://oficinadainteligencia.com.br/wp-content/uploads/2019/07/opulent-profile-square-07.jpg',
                name: 'João',
                level: 'Aprendiz'
            },
            activity: {
                id: 3,
                title: 'Titulo da Atividade',
                briefing: 'Aqui entra uma pequena descrição do que a monitora Megan Fox escreveu e você ...'
            }
        }
    }

    return (
        <>
            <h1 className="title">Lista de atividades disponíveis para correção</h1>

            <ActivityOutdoor data={mockRecentlyCorrected()} actionTitle="Ver detalhes"/>
        </>
    );
}

export default ActivitiesList;
