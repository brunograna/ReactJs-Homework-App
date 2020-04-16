import React from "react";
import './styles.css';

function InputText({name, placeholder}) {
    return (
        <input type="text" className="input-text" name={name} placeholder={placeholder} />
    );
}

export default InputText;