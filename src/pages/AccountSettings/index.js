import React, {useEffect, useState} from "react";
import './styles.css';
import InputText from "../../components/InputText";
import {getDecodedToken} from "../../services/auth";

function AccountSettings() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(()=> {
        window.scrollTo(0, 0);
        let decodedToken = getDecodedToken();
        setUsername(decodedToken.username);
        setEmail(decodedToken.email);
    }, []);

    return (
        <>
            <h1 className="title">Sobre a sua conta</h1>
            <div className="input-group">
                <span>Nome de usuário</span>
                <InputText name="title"
                           value={username}
                           disabled
                           placeholder="Seu nome de usuário" />
                <small>(Este dado não pode ser alterado)</small>
            </div>
            <div className="input-group">
                <span>Email</span>
                <InputText name="title"
                           value={email}
                           disabled
                           placeholder="Seu email" />
                <small>(Este dado não pode ser alterado)</small>
            </div>
        </>
    );
}

export default AccountSettings;