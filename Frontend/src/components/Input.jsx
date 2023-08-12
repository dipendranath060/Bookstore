import React from 'react'

function Input(props) {
    return (
        <div className="mb-3">
            <label htmlFor={props.id} className="form-label">{props.label}</label>
            <input
                type={props.type}
                className="form-control"
                id={props.id}
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    )
}

export default Input