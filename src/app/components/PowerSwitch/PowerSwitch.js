import React from 'react';
import styles from './PowerSwitch.styles';
import './PowerSwitch.css';

const DEFAULT_RIGHT_POSITION = 22;

const PowerSwitch = (props) => {
    const stylesCircle = {...styles.circle};
    const stylesIcon = {...styles.icon};
    const classes = [];
    
    stylesIcon.backgroundImage = `url(${props.backgroundImage})`;    
    stylesCircle.right = `${props.right || DEFAULT_RIGHT_POSITION}px`;  

    if (props.value === true) {
        stylesCircle.background = 'white';
        stylesCircle.opacity = '1';
    }

    if (props.loading === true) {
        classes.push('Pulsate');
    }

    return (
        <div className={classes.join(' ')} onClick={() => { props.onSwitchChange() }} style={stylesCircle}>
            <span aria-label="fire" style={stylesIcon} role="img"></span>
        </div>
    );
};

export default PowerSwitch;

