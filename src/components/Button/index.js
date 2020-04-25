import React from "react";
import './styles.css';
import {Link} from "react-router-dom";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

function Button({to, title, className}) {
    return (
        <Link to={to} className={`primary-button ${className}`}>
            {title}
            <ArrowForwardIcon style={{color: '#ffffff'}} />
        </Link>
    );
}

export default Button;