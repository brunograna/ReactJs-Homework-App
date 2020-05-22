import React from "react";
import './styles.css';

function Select({data, name, id, ...rest}) {

    return (
        <div className="matter-container">
            <select name={name} id={id} className={"matter"} {...rest}>
                <option disabled>Selecione um assunto</option>
                {data.options.map((option) => (
                    <option key={option.key} value={option.key}>{option.name}</option>
                ))}
            </select>
        </div>
    );
}

export default Select;