import React from "react";
import './styles.css';
import {Link} from "react-router-dom";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

function ButtonForward({to, title, className, ...rest}) {
    return (
        <Link to={to} className={`primary-button ${className}`} {...rest}>
            {title}
            <ArrowForwardIcon style={{color: '#ffffff'}} />
        </Link>
    );
}

export default ButtonForward;