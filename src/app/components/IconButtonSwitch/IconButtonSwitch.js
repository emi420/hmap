import React from 'react';
import styles from './IconButtonSwitch.styles';
import './IconButtonSwitch.css';
import IconButton from '@mui/material/IconButton';


const IconButtonSwitch = (props) => {
    const stylesCircle = {...styles.circle};
    const stylesIcon = {...styles.icon};
    const classes = [];
    
    stylesIcon.backgroundImage = `url(${props.backgroundImage})`;    

    if (props.value === true) {
        stylesCircle.background = 'white';
        stylesCircle.opacity = '1';
    }

    if (props.loading === true) {
        classes.push('Pulsate');
    }

    return <IconButton  onClick={() => { props.onClick() }} style={stylesCircle} className={classes.join(' ')} color="primary" aria-label="fire" component="span"><span aria-label="fire" style={stylesIcon} role="img"></span></IconButton>;
};

export default IconButtonSwitch;

