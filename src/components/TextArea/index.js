import React from "react";
import './styles.css';

function TextArea({rows, cols, name, placeholder, ...rest}) {
    return (
        <textarea {...rest} rows={rows?rows:4} cols={cols?cols:50} className="text-area" name={name} placeholder={placeholder} />
    );
}

export default TextArea;