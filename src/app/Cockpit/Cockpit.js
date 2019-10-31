import React, { PureComponent } from 'react';
import Map from '../Map/Map';
import PowerSwitch from '../PowerSwitch/PowerSwitch';
import layers, { DEFAULT_HIDDEN_LAYERS } from '../../config/layers';

class Cockpit extends PureComponent {

    state = {
        showFire: false,
        hiddenLayers: DEFAULT_HIDDEN_LAYERS
    }

    constructor() {
        super();
        this.powerSwitchClickHandler = this.powerSwitchClickHandler.bind(this);
    }

    render() {
        return (
            <div>
                <PowerSwitch value={this.state.showFire} onSwitchChange={this.powerSwitchClickHandler} />
                <Map layers={layers} hiddenLayers={this.state.hiddenLayers} />
            </div>
        );
    }

    powerSwitchClickHandler() {
        if (this.state.showFire) {
            this.setState({
                hiddenLayers: DEFAULT_HIDDEN_LAYERS,
                showFire: false,
            });
        } else {
            this.setState({
                hiddenLayers: [],
                showFire: true,
            });
        }
    }

}

export default Cockpit;