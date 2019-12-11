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
import { withRouter } from 'react-router-dom'
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
        query: "",
    }

    constructor(props) {
        super(props);
        const query = queryString.parse(this.props.location.search);
        if (query.coord) {
            this.state.query = query.coord;
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
                    onClick={this.mapClickHandler}
                    onStyleLoad={ el => {
                        this.map = el;
                        if (this.state.query) {
                            this.coordinateSubmitHandler(false, true);
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
                <CoordinateInput value={this.state.coordinateInputValue} onChange={this.coordinateChangeHandler} onSubmit={(event) => this.coordinateSubmitHandler(event, true)} />
                <DTMFListener listen={this.state.isListening} onDecode={this.DTMFDecodeHandler} />    
            </div>
        );
    }

    clockClickHandler = () => {
        this.switchFireHistoryLayer()
    }

    fireClickHandler = () => {
        this.switchFIRMSLayer();
    }

    earClickHandler = () => {
        this.switchDTMFListening();
        this.DTMFListeningTimeout = setTimeout(() => {
            if (this.state.isListening) {
                this.switchDTMFListening();
            }
        }, 120000);
    }

    mapClickHandler = (clickEvent, mapEvent) => {
        const coordinateString = `${mapEvent.lngLat.lng.toString().slice(0, 8)} ${mapEvent.lngLat.lat.toString().slice(0,8)}`;
        this.setState({
            coordinateInputValue: coordinateString
        });
        this.props.history.push(`?coord=${coordinateString}`)
        this.coordinateSubmitHandler()
    }

    DTMFDecodeHandler = (rawValue) => {

        //console.log(rawValue)

        const value = rawValue.replace('A', '');
        let coordinateString = "";

        if (this.state.DTMFCoordinateString.length === 0 || this.state.DTMFCoordinateString.slice(-1) !== value) {
            coordinateString = this.state.DTMFCoordinateString + value;
            this.setState({
                DTMFCoordinateString: coordinateString
            });
        }

        console.log('coordinateString:', coordinateString);

        if (coordinateString.replace(/#/g, '').length === 12) {

            coordinateString = coordinateString.replace(/#/g, '');

            const coordinateDTMFDecoder = DTMFCoordinate(coordinateString);

            if (coordinateDTMFDecoder.decoded) {
            
                const coords = coordinateDTMFDecoder.coordinate;
                
                console.log('coords:', coords);

                this.setState({
                    coordinateInputValue: coords.join(' ')
                });
                this.coordinateSubmitHandler(coords, true);
                this.switchDTMFListening();

            } else {
                if (!coordinateDTMFDecoder.error) {
                    this.setState({
                        DTMFCoordinateString: coordinateString,
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

    coordinateChangeHandler = (value) => {
        this.setState({
            coordinateInputValue: value
        });
    }

    coordinateSubmitHandler= (coordinateValue, fly) => {
        
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
                let updatedLayers;

                // updatedLayers = [...this.state.layers, myLayer];
                updatedLayers = [myLayer];
    
                this.setState({
                    layers: updatedLayers,
                });
                if (fly === true) {
                    this.map.flyTo({
                        center: coords,
                        zoom: [15]
                    });
                }
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

