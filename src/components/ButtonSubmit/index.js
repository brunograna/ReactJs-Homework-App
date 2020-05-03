import React from "react";
import './styles.css';
import SendRoundedIcon from '@material-ui/icons/SendRounded';

function ButtonSubmit({to, title, className, ...rest}) {
    return (
        <button type='submit' className={`button-submit ${className}`} {...rest}>
            {title}
            <SendRoundedIcon style={{color: '#ffffff'}} />
        </button>
    );
}

export default ButtonSubmit;