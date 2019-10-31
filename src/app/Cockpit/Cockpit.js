import React, { PureComponent } from 'react';
import Map from '../Map/Map';
import PowerSwitch from '../PowerSwitch/PowerSwitch';

class Cockpit extends PureComponent {

    state = {
        showFire: false,
    }

    constructor() {
        super();
        this.powerSwitchClickHandler = this.powerSwitchClickHandler.bind(this);
    }

    render() {
        return (
            <div>
                <PowerSwitch value={this.state.showFire} onSwitchChange={this.powerSwitchClickHandler} />
                <Map showFire={this.state.showFire} />
            </div>
        );
    }

    powerSwitchClickHandler() {
        this.setState({
            showFire: !this.state.showFire
        });
    }

}

export default Cockpit;