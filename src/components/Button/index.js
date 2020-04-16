import React from "react";
import './styles.css';
import {Link} from "react-router-dom";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

function Button({to, title}) {
    return (
        <Link to={to} className="primary-button">
            {title}
            <ArrowForwardIcon style={{color: '#ffffff'}} />
        </Link>
    );
}

export default Button;