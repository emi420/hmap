import React, { PureComponent } from 'react';
import IconButtonSwitch from '../../components/IconButtonSwitch/IconButtonSwitch';
import layers, { DEFAULT_HIDDEN_LAYERS } from '../../../config/layers';
import { connect } from "react-redux";
import ReactMapboxGl from 'react-mapbox-gl';
import MapLayers from '../../components/Map/MapLayers/MapLayers';
import FIRMSLayer from '../../components/FIRMSLayer/FIRMSLayer';
import CoordinatePointLayer from '../../components/CoordinatePointLayer/CoordinatePointLayer';
import {
    MAP_DEFAULT_CENTER,
    MAPBOX_ACCESS_TOKEN,
    MAPBOX_DEFAULT_STYLE,
} from '../../../config/config';
import { FIRMSLatestModis24Action, FIRMSLatestViirs24Action } from '../../app/actions';
import { getFIRMSLatestModis24GeoJSON, getFIRMSLatestViirs24GeoJSON } from '../../app/selectors';
import DTMFListener from '../../components/DTMF/DTMFListener';
import DTMFCoordinate from '../../components/DTMF/DTMFCoordinate';
import CoordinateInput from '../../components/CoordinateInput/CoordinateInput';
import { withRouter } from 'react-router'
import queryString from 'query-string';

const MainMap = ReactMapboxGl({
    accessToken: MAPBOX_ACCESS_TOKEN
});

class Cockpit extends PureComponent {

    DTMFListeningTimeout = null;

    state = {
        showFireHistory: false,
        showFIRMS: false,
        firmsDataWasLoaded: false,
        center: MAP_DEFAULT_CENTER,
        isListening: false,
        hiddenLayers: DEFAULT_HIDDEN_LAYERS,
        layers: [],
        coordinateInputValue: "",
        DTMFCoordinateString: "",
    }

    constructor(props) {
        super(props);
        this.clockClickHandler = this.clockClickHandler.bind(this);
        this.fireClickHandler = this.fireClickHandler.bind(this);
        this.earClickHandler = this.earClickHandler.bind(this);
        this.coordinateSubmitHandler = this.coordinateSubmitHandler.bind(this);
        this.DTMFDecodeHandler = this.DTMFDecodeHandler.bind(this);
        this.coordinateChangeHandler = this.coordinateChangeHandler.bind(this);
        const query = queryString.parse(this.props.location.search);
        if (query.coord) {
            this.state.coordinateInputValue = query.coord;
        }
    }

    render() {
        const firmsIsLoading = this.state.firmsDataWasLoaded && (this.props.FIRMSLatestViirs24.features.length < 1 || this.props.FIRMSLatestModis24.features.length < 1);
        const FIRMSModisLayer = this.props.FIRMSLatestModis24 ? FIRMSLayer('firms-modis', this.props.FIRMSLatestModis24) : [];
        const FIRMSViirsLayer = this.props.FIRMSLatestViirs24 ? FIRMSLayer('firms-viirs', this.props.FIRMSLatestViirs24) : [];
        const allLayers = [...layers, ...this.state.layers, ...FIRMSModisLayer, ...FIRMSViirsLayer];

        return (
            <div>
                <MainMap
                    // eslint-disable-next-line react/style-prop-object
                    onStyleLoad={ el => {
                        this.map = el;
                        if (this.state.coordinateInputValue) {
                            this.coordinateSubmitHandler();
                        }
                    }} 
                    style={MAPBOX_DEFAULT_STYLE}
                    center={this.state.center}
                    containerStyle={{
                        height: '100vh',
                        width: '100vw'
                    }}
                    antialias={true}
                > 
                    <MapLayers 
                        onDTMFDecode={this.DTMFDecodeHandler}
                        layers={allLayers}
                        hiddenLayers={this.state.hiddenLayers}
                    />                    
                </MainMap>
                <IconButtonSwitch backgroundImage="clock-icon.png" value={this.state.showFireHistory} onClick={this.clockClickHandler} />
                <IconButtonSwitch loading={firmsIsLoading} right={64} backgroundImage="fire-emoji.png" value={this.state.showFIRMS} onClick={this.fireClickHandler} />
                <IconButtonSwitch loading={this.state.isListening} right={105} backgroundImage="ear-icon.png" onClick={this.earClickHandler} />
                <CoordinateInput value={this.state.coordinateInputValue} onChange={this.coordinateChangeHandler} onSubmit={this.coordinateSubmitHandler} />
                <DTMFListener listen={this.state.isListening} onDecode={this.DTMFDecodeHandler} />    
            </div>
        );
    }

    clockClickHandler() {
        this.switchFireHistoryLayer()
    }

    fireClickHandler() {
        this.switchFIRMSLayer();
    }

    earClickHandler() {
        this.switchDTMFListening();
        this.DTMFListeningTimeout = setTimeout(() => {
            if (this.state.isListening) {
                this.switchDTMFListening();
            }
        }, 20000);
    }

    DTMFDecodeHandler(rawValue) {

        const value = rawValue.replace('A', '').replace('#', '');

        if (
            value !== '*' ||
            (value === '*' && this.state.DTMFCoordinateString[this.state.DTMFCoordinateString.length - 1] !== "*")
        ) {
            const coordinateDTMFDecoder = DTMFCoordinate(this.state.DTMFCoordinateString + value);

            if (coordinateDTMFDecoder.decoded) {
            
                const coords = coordinateDTMFDecoder.coordinate;
                this.setState({
                    coordinateInputValue: coords.join(' ')
                });
                this.coordinateSubmitHandler(coords);
                this.switchDTMFListening();

            } else {
                if (!coordinateDTMFDecoder.error) {
                    this.setState({
                        DTMFCoordinateString: this.state.DTMFCoordinateString + value,
                        coordinateInputValue: '',
                    });    
                } else {
                    this.setState({
                        DTMFCoordinateString: '',
                        coordinateInputValue: '',
                    });
                    this.switchDTMFListening();
                }
            }
        }
    }

    coordinateChangeHandler(value) {
        this.setState({
            coordinateInputValue: value
        });
    }

    coordinateSubmitHandler(coordinateValue) {
        
        let value;
        let coords;

        if (!coordinateValue) {
            value = this.state.coordinateInputValue;
            coords = value.split(' ');
        } else {
            coords = coordinateValue;
        }
        
        if (coords.length === 2) {

            try {
                const myLayer = CoordinatePointLayer(coords);
                const updatedLayers = [...this.state.layers, myLayer];
    
                this.setState({
                    layers: updatedLayers,
                });
    
                this.map.flyTo({
                    center: coords,
                    zoom: [15]
                });
            } catch(e) {
                console.log("Coordinate error", e);
                this.switchDTMFListening();
            }
        }
    }

    switchDTMFListening () {
        clearTimeout(this.DTMFListeningTimeout);
        this.setState({
            DTMFCoordinateString: this.state.isListening ? this.state.DTMFCoordinateString : '',
            isListening: !this.state.isListening,
        });
    }

    switchFireHistoryLayer() {
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

    switchFIRMSLayer() {
        if (this.state.showFIRMS) {
            const hiddenLayers = [...this.state.hiddenLayers, 'firms-modis', 'firms-viirs'];
            this.setState({
                hiddenLayers: hiddenLayers,
                showFIRMS: false,
            });
        } else {
            if (!this.state.firmsDataWasLoaded) {
                this.props.FIRMSLatestModis24Action();
                this.props.FIRMSLatestViirs24Action();    
                this.setState({
                    firmsDataWasLoaded: true
                });
            }
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cockpit));

