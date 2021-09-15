import React from 'react';
import styles from './styles';
import './TextButton.css';


const TextButton = (props) => {
    const stylesBackground = {...styles.background};

    const classes = [];


    if (props.loading === true) {
        classes.push('Pulsate');
    }

    return (
        // <div className={classes.join(' ')} onClick={() => { props.onClick() }} >
           <button onClick={() => { props.onClick() }} className={classes.join(' ')} style={stylesBackground} type="button">{props.text}</button>
        // </div>
    );
};

export default TextButton;

