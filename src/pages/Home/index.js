import React from "react";
import './styles.css';
import WaitingCorrection from "../../components/WaitingCorrection";
import RecentlyCorrected from "../../components/RecentlyCorrected";

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
                image: 'https://i0.wp.com/www.passejaconcurseiro.com.br/wp-content/uploads/2017/03/opulent-profile-square-06-1.jpg?ssl=1',
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

            <h1 className="title">Recentemente Corrigidas</h1>
            <RecentlyCorrected data={mockRecentlyCorrected()}/>
        </>
    );
}

export default Home;