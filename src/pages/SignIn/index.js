import React from "react";
import './styles.css';
import Waves from '../../assets/Waves.svg';
import InputText from "../../components/InputText";
import ButtonForward from "../../components/ButtonForward";
import InputPassword from "../../components/InputPassword";

function SignIn() {

    return (
        <>
            <div className="container">
                <form action="">
                    <h1 className="title">Identifique-se para poder prosseguir</h1>
                    <div className="input-group">
                        <span>Nome de usuário</span>
                        <InputText name="username" placeholder={"my_username"} />
                    </div>
                    <div className="input-group">
                        <span>Senha de acesso</span>
                        <InputPassword name="password" placeholder={"******"} />
                    </div>
                    <ButtonForward title='Entrar' />
                </form>
            </div>
            <img src={Waves} className="waves"/>
        </>
    );
};

export default SignIn;