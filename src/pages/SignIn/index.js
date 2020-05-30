import React, {useState} from "react";
import './styles.css';
import InputText from "../../components/InputText";
import InputPassword from "../../components/InputPassword";
import ButtonSubmit from "../../components/ButtonSubmit";
import api from "../../services/api";
import {login, logout} from "../../services/auth";
import {Link, useHistory} from "react-router-dom";
import {types, useAlert} from "react-alert";

function SignIn({childSetIsAuthenticated}) {
    const alert = useAlert();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hasFailure, setHasFailure] = useState(false);
    const history = useHistory();

    async function handleSignIn(e) {
        e.preventDefault();
        try {
            const response = await api.post('/auth/token', {username, password});
            console.log(response.data);
            if (response.status === 200) {
                const {access_token} = response.data;
                login(access_token);
                childSetIsAuthenticated(true);
                history.push('/');
            }
        } catch (e) {
            console.log(e.response);
            if (e.response != null && e.response.status === 401) {
                setPassword('');
                setHasFailure(true);
                childSetIsAuthenticated(false);
                logout();
            } else {
                alert.show('Algo de errado aconteceu', {type: types.ERROR});
            }
        }
    }

    function isWithFailure() {
        return hasFailure === true ? 'has-failure' : 'hide';
    }

    return (
        <>
            <div className="container">
                <form method='POST' onSubmit={handleSignIn}>
                    <h1 className="title">Identifique-se para poder prosseguir</h1>
                    <div className="input-group">
                        <span>Nome de usuário</span>
                        <InputText
                            name="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder={"seu nome de usuário"} />
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
                        <span>Usuário ou senha incorretos</span>
                    </div>
                    <ButtonSubmit title='Entrar' />
                    <div className={`signup`}>
                        <span>Ainda não possui a sua conta ? <Link to={'/sign-up'}>Criar agora</Link></span>
                    </div>
                </form>
            </div>
            {/*<img src={Waves} className="waves" alt='Pink waves on the background'/>*/}
        </>
    );
};

export default SignIn;
