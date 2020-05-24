import React, {useState} from "react";
import './styles.css';
import InputText from "../../components/InputText";
import InputPassword from "../../components/InputPassword";
import ButtonSubmit from "../../components/ButtonSubmit";
import api from "../../services/api";
import {login, logout} from "../../services/auth";
import {Link, useHistory} from "react-router-dom";
import {types} from "react-alert";

function SignUp({childSetIsAuthenticated}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [hasFailure, setHasFailure] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);
    const history = useHistory();

    async function handleSignUp(e) {
        e.preventDefault();
        try {
            const response = await api.post('/users', {username, password, email});
            if (response.status === 201) {
                await logUserIn();
            } else {
                alert.show('Algo inesperado aconteceu!', {type: types.INFO});
                console.log(response);
            }
        } catch (e) {
            if (e.response != null && e.response.status === 400) {
                setPassword('');
                setClientErrorMessage(e.response.data.detail);
            } else {
                alert.show('Algo de errado aconteceu!', {type: types.ERROR});
            }
        }
    }

    async function logUserIn() {
        try {
            const response = await api.post('/auth/token', {username, password});
            if (response.status === 200) {
                const {access_token} = response.data;
                login(access_token);
                childSetIsAuthenticated(true);
                history.push('/');
                setPassword('');
                setUsername('');
                setEmail('');
            }
        } catch (e) {
            setPassword('');
            setHasFailure(true);
            childSetIsAuthenticated(false);
            logout();
        }
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
            message.replace('username', 'nome de usuário')
                    .replace('password', 'senha'));
        setErrorMessage(message);
    }

    return (
        <>
            <div className="container">
                <form method='POST' onSubmit={handleSignUp}>
                    <h1 className="title">Informe os dados da sua conta</h1>
                    <div className="input-group">
                        <span>Nome de usuário</span>
                        <InputText
                            name="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder={"nome de usuário"} />
                    </div>
                    <div className="input-group">
                        <span>Email</span>
                        <InputText
                            type='email'
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder={"email@dominio.com"} />
                    </div>
                    <div className="input-group">
                        <span>Senha de acesso</span>
                        <InputPassword
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder={"********"} />
                    </div>
                    <div className={`error-message ${isWithFailure()}`}>
                        {
                            errorMessage.map((message) => (
                                <span key={message}>{message}</span>
                            ))
                        }
                    </div>
                    <ButtonSubmit title='Cadastrar' />
                    <div className={`signup`}>
                        <span>Já possui uma conta ? <Link to={'/sign-in'}>Entrar</Link></span>
                    </div>
                </form>
            </div>
            {/*<img src={Waves} className="waves" alt='Pink waves on the background'/>*/}
        </>
    );
};

export default SignUp;
