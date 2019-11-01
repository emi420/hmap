import React, { PureComponent } from 'react';
import Map from '../../components/Map/Map';
import PowerSwitch from '../../components/PowerSwitch/PowerSwitch';
import layers, { DEFAULT_HIDDEN_LAYERS } from '../../../config/layers';
import { connect } from "react-redux";
import { FIRMSLatestModis24Action, FIRMSLatestViirs24Action } from '../../app/actions';
import { getFIRMSLatestModis24GeoJSON, getFIRMSLatestViirs24GeoJSON } from '../../app/selectors';

class Cockpit extends PureComponent {

    state = {
        showFireHistory: false,
        showFIRMS: true,
        hiddenLayers: DEFAULT_HIDDEN_LAYERS
    }

    constructor() {
        super();
        this.clockClickHandler = this.clockClickHandler.bind(this);
        this.fireClickHandler = this.fireClickHandler.bind(this);
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
                    "circle-radius": 4,
                    "circle-color": "red",
                }
            },
        ] : []; 

        const FIRMSViirsLayer = this.props.FIRMSLatestViirs24 ? [
            {
                id: 'firms-viirs',
                data: this.props.FIRMSLatestViirs24,
                circlePaint: {
                    "circle-radius": 4,
                    "circle-color": "yellow",
                }
            },
        ] : []; 

        const allLayers = [...layers, ...FIRMSModisLayer, ...FIRMSViirsLayer];

        return (
            <div>
                <PowerSwitch backgroundImage="clock-icon.png" value={this.state.showFireHistory} onSwitchChange={this.clockClickHandler} />
                <PowerSwitch right={64} backgroundImage="fire-emoji.png" value={this.state.showFIRMS} onSwitchChange={this.fireClickHandler} />
                <Map layers={allLayers} hiddenLayers={this.state.hiddenLayers} />
            </div>
        );
    }

    clockClickHandler() {
        if (this.state.showFireHistory) {
            const hiddenLayers = [...this.state.hiddenLayers, 'big-fires'];

            this.setState({
                hiddenLayers: hiddenLayers,
                showFireHistory: false,
            });
        } else {
            const hiddenLayers = [...this.state.hiddenLayers];
            hiddenLayers.splice(hiddenLayers.indexOf('big-fires'), 1);
            this.setState({
                hiddenLayers: hiddenLayers,
                showFireHistory: true,
            });
        }

    }

    fireClickHandler() {
        if (this.state.showFIRMS) {
            const hiddenLayers = [...this.state.hiddenLayers, 'firms-modis', 'firms-viirs'];

            this.setState({
                hiddenLayers: hiddenLayers,
                showFIRMS: false,
            });
        } else {
            const hiddenLayers = [...this.state.hiddenLayers];
            hiddenLayers.splice(hiddenLayers.indexOf('firms-modis'), 1);
            hiddenLayers.splice(hiddenLayers.indexOf('firms-viirs'), 1);
            this.setState({
                hiddenLayers: hiddenLayers,
                showFIRMS: true,
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

