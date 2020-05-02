import React from "react";
import './styles.css';

function InputPassword({name, placeholder, ...rest}) {
    return (
        <input {...rest} type="password" className="input-text" name={name} placeholder={placeholder} />
    );
}

export default InputPassword;