import React, { PureComponent } from 'react';
import Map from '../../components/Map/Map';
import PowerSwitch from '../../components/PowerSwitch/PowerSwitch';
import layers, { DEFAULT_HIDDEN_LAYERS } from '../../../config/layers';

class Cockpit extends PureComponent {

    state = {
        showAll: false,
        hiddenLayers: DEFAULT_HIDDEN_LAYERS
    }

    constructor() {
        super();
        this.powerSwitchClickHandler = this.powerSwitchClickHandler.bind(this);
    }

    render() {
        return (
            <div>
                <PowerSwitch value={this.state.showAll} onSwitchChange={this.powerSwitchClickHandler} />
                <Map layers={layers} hiddenLayers={this.state.hiddenLayers} />
            </div>
        );
    }

    powerSwitchClickHandler() {
        if (this.state.showAll) {
            this.setState({
                hiddenLayers: DEFAULT_HIDDEN_LAYERS,
                showAll: false,
            });
        } else {
            this.setState({
                hiddenLayers: [],
                showAll: true,
            });
        }
    }

}

export default Cockpit;