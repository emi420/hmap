import React from 'react';
import './BigText.css';

const BigText = (props) => {
    
    return (
        <div className="BigText">
            {props.children}
        </div>
    )
}

export default BigText;
