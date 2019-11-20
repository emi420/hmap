import React from 'react';
import './CoordinateInput.css';

const CoordinateInput = (props) => {
    
    const submitHandler = (e) => {
        e.preventDefault();
        props.onSubmit();
    }

    const textChangeHandler = (e) => {
        props.onChange(e.target.value);
    }

    return (
        <form onSubmit={submitHandler}>
            <input placeholder="-64.10021 -31.0649" onChange={textChangeHandler} value={props.value} type="text" className="CoordinateInput" />
        </form>
    )
}

export default CoordinateInput;
