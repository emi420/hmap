import React from 'react';
import styles from './PowerSwitch.styles';

const PowerSwitch = (props) => {
    const stylesCircle = {...styles.circle};
    const stylesEmoji = {...styles.emoji};
    
    stylesEmoji.backgroundImage = `url(${props.backgroundImage})`;    
    stylesCircle.right = `${props.right || 22}px`;  

    if (props.value === true) {
        stylesCircle.background = 'white';
        stylesCircle.opacity = '1';
    }
    return (
        <div onClick={() => { props.onSwitchChange() }} style={stylesCircle}>
            <span aria-label="fire" style={stylesEmoji} role="img"></span>
        </div>
    );
};

export default PowerSwitch;

