import React from "react";
import './styles.css';
import WaitingCorrection from "../../components/WaitingCorrection";
import ActivityOutdoor from "../../components/RecentlyCorrected";

function Home() {
    console.log("Home - screen");

    function mockPortugueseWaitingCorrection() {
        return {
            title: 'Atividade de Português',
            activity_id: 2,
            subject: {
                icon: 'http://10.0.0.104:3000/icons/subjects/portuguese.svg',
                name: 'Math'
            }
        };
    }
    function mockMathWaitingCorrection() {
        return {
            title: 'Atividade de matemática',
            activity_id: 2,
            subject: {
                icon: 'http://10.0.0.104:3000/icons/subjects/math.svg',
                name: 'Math'
            }
        };
    }
    
    function mockRecentlyCorrected() {
        return {
            teacher: {
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQNTjHSbM5Dv-1l3lWfo-xe-r7LeUtGVNypni0O7enY0EHLS8Pw&usqp=CAU',
                name: 'Megan Fox',
                level: 'Monitor'
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
            <h1 className="title">Aguardando correção</h1>
            <WaitingCorrection data={mockPortugueseWaitingCorrection()} />
            <WaitingCorrection data={mockMathWaitingCorrection()} />

            <h1 className="title">Suas atividades corrigidas</h1>
            <ActivityOutdoor data={mockRecentlyCorrected()}/>
        </>
    );
}

export default Home;