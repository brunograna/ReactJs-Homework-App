import React, {useState} from "react";
import './styles.css';
import InputText from "../../components/InputText";
import InputPassword from "../../components/InputPassword";
import ButtonSubmit from "../../components/ButtonSubmit";
import api from "../../services/api";
import {login, logout} from "../../services/auth";
import {useHistory} from "react-router-dom";

function SignIn({childSetIsAuthenticated}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    async function handleSignIn(e) {
        e.preventDefault();
        const response = await api.post('/auth/token', {username, password});
        console.log(response);
        if (response.status === 401) {
            setPassword('');
            alert('Username or password incorrect');
            childSetIsAuthenticated(false);
            logout();
        } else if (response.status === 200) {
            const {access_token} = response.data;
            login(access_token);
            childSetIsAuthenticated(true);
            history.push('/');
        } else {
            childSetIsAuthenticated(false);
            logout();
            alert('Something wrong ocurred');
        }
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
                            placeholder={"my_username"} />
                    </div>
                    <div className="input-group">
                        <span>Senha de acesso</span>
                        <InputPassword
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder={"******"} />
                    </div>
                    <ButtonSubmit title='Entrar' />
                </form>
            </div>
            {/*<img src={Waves} className="waves" alt='Pink waves on the background'/>*/}
        </>
    );
};

export default SignIn;