import React from "react";
import {Link} from "react-router-dom";
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import './styles.css';

function Account() {
    return (
        <>
            <h1 className="title">Detalhes sobre a sua conta</h1>
            <div className="options-box">
                <div className="box">
                    <Link to='/logout' >
                        Logout
                        <ExitToAppOutlinedIcon className='icon' />
                    </Link>
                </div>
                <div className="box">
                    <Link to='/account/settings' >
                        Configurações
                        <SettingsOutlinedIcon className='icon' />
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Account;