import React from "react";
import './styles.css';

function Select({data, name, id}) {

    return (
        <div className="matter-container">
            <select name={name} id={id} className={"matter"}>
                <option disabled>Selecione um assunto</option>
                {data.options.map((option) => (
                    <option value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
}

export default Select;