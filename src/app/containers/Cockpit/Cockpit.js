import React, { PureComponent } from 'react';
import Map from '../../components/Map/Map';
import PowerSwitch from '../../components/PowerSwitch/PowerSwitch';
import layers, { DEFAULT_HIDDEN_LAYERS } from '../../../config/layers';
import { connect } from "react-redux";
import { FIRMSLatestModis24Action, FIRMSLatestViirs24Action } from '../../app/actions';
import { getFIRMSLatestModis24GeoJSON, getFIRMSLatestViirs24GeoJSON } from '../../app/selectors';

class Cockpit extends PureComponent {

    state = {
        showAll: false,
        hiddenLayers: DEFAULT_HIDDEN_LAYERS
    }

    constructor() {
        super();
        this.powerSwitchClickHandler = this.powerSwitchClickHandler.bind(this);
    }

    componentWillMount() {
        this.props.FIRMSLatestModis24Action();
        this.props.FIRMSLatestViirs24Action();
    }

    render() {
        const FIRMSModisLayer = this.props.FIRMSLatestModis24 ? [
            {
                id: 'firms-modis',
                data: this.props.FIRMSLatestModis24,
                circlePaint: {
                    "circle-radius": 5,
                    "circle-color": "red",
                }
            },
        ] : []; 

        const FIRMSViirsLayer = this.props.FIRMSLatestViirs24 ? [
            {
                id: 'firms-viirs',
                data: this.props.FIRMSLatestViirs24,
                circlePaint: {
                    "circle-radius": 5,
                    "circle-color": "yellow",
                }
            },
        ] : []; 

        const allLayers = [...layers, ...FIRMSModisLayer, ...FIRMSViirsLayer];

        return (
            <div>
                <PowerSwitch value={this.state.showAll} onSwitchChange={this.powerSwitchClickHandler} />
                <Map layers={allLayers} hiddenLayers={this.state.hiddenLayers} />
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
const mapStateToProps = state => ({
    FIRMSLatestModis24: getFIRMSLatestModis24GeoJSON(state),
    FIRMSLatestViirs24: getFIRMSLatestViirs24GeoJSON(state),
});

const mapDispatchToProps = dispatch => ({
    FIRMSLatestModis24Action: () => dispatch(FIRMSLatestModis24Action),
    FIRMSLatestViirs24Action: () => dispatch(FIRMSLatestViirs24Action),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cockpit);

