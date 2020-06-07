import React from "react";
import './styles.css';
import {Link} from "react-router-dom";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

function ButtonForward({to, title, className, titleAccess, ...rest}) {
    return (
        <Link to={to} className={`primary-button ${className}`} {...rest}>
            {title ? title : ''}
            <ArrowForwardIcon titleAccess={titleAccess} style={title ? {color: '#ffffff'} : {color: '#ffffff', paddingLeft: 0, fontSize: '1.3rem'}} />
        </Link>
    );
}

export default ButtonForward;