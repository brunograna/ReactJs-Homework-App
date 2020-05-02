import React from "react";
import './styles.css';

function InputText({name, placeholder, ...rest}) {
    return (
        <input {...rest} type="text" className="input-text" name={name} placeholder={placeholder} />
    );
}

export default InputText;