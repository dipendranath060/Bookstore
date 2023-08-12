import React from 'react'

function Select(props) {
    return (
        <div className="mb-3">
            <label htmlFor={props.id} className="form-label">{props.label}</label>

            <select name={props.name} className="form-select" id={props.id} value={props.value} onChange={props.onChange}>
                {props.data.map(v => (
                    <option value={v.value}>{v.label}</option>
                ))}
            </select>
        </div>
    )
}

export default Select