import React from 'react';

const styles = {
    'background': 'rgba(255,255,255,.75)',
    'position': 'fixed',
    'width': '22px',
    'height': '22px', 
    'right': '22px',
    'padding': '4px',
    'top': '25px',
    'borderRadius': '100%',
    'cursor': 'pointer',
    'zIndex': '99999',
    'boxShadow': '1px 1px 1px rgba(0,0,0,.5)' 
}

const stylesSpan = {
    opacity: '.75',
}

const PowerSwitch = (props) => {
    const stylesCopy = {...styles};
    const stylesSpanCopy = {...stylesSpan};
    
    if (props.value === true) {
        stylesCopy.background = 'white';
        stylesSpanCopy.opacity = '1';
    }
    return (
        <div onClick={() => { props.onSwitchChange() }} style={stylesCopy}>
            <span aria-label="fire" style={stylesSpanCopy} role="img">🔥</span>
        </div>
    );
};

export default PowerSwitch;

