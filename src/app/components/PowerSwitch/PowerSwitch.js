import React from 'react';
import styles from './PowerSwitch.styles';

const PowerSwitch = (props) => {
    const stylesCircle = {...styles.circle};
    
    if (props.value === true) {
        stylesCircle.background = 'white';
        stylesCircle.opacity = '1';
    }
    return (
        <div onClick={() => { props.onSwitchChange() }} style={stylesCircle}>
            <span aria-label="fire" style={styles.emoji} role="img"></span>
        </div>
    );
};

export default PowerSwitch;

