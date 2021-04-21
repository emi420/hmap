import React, { PureComponent } from "react";
import IconButtonSwitch from "../../components/IconButtonSwitch/IconButtonSwitch";
import layers, { DEFAULT_HIDDEN_LAYERS } from "../../../config/layers";
import { connect } from "react-redux";
import ReactMapboxGl, { Popup } from "react-mapbox-gl";
import MapLayers from "../../components/Map/MapLayers/MapLayers";
import FIRMSLayer from "../../components/FIRMSLayer/FIRMSLayer";
import GOESLayer from "../../components/GOESLayer/GOESLayer";
import CoordinatePointLayer from "../../components/CoordinatePointLayer/CoordinatePointLayer";
import {
  MAP_DEFAULT_CENTER,
  MAPBOX_ACCESS_TOKEN,
  MAPBOX_DEFAULT_STYLE,
} from "../../../config/config";
import {
  FIRMSLatestModis24Action,
  FIRMSLatestViirs24Action,
  GoesLatestAction,
} from "../../app/actions";
import {
  getFIRMSLatestModis24GeoJSON,
  getFIRMSLatestViirs24GeoJSON,
  getLatestGoesGeoJSON
} from "../../app/selectors";
import CoordinateInput from "../../components/CoordinateInput/CoordinateInput";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

const MainMap = ReactMapboxGl({
  accessToken: MAPBOX_ACCESS_TOKEN,
});

class Cockpit extends PureComponent {

  state = {
    showFireHistory: false,
    showFIRMS: false,
    firmsDataWasLoaded: false,
    center: MAP_DEFAULT_CENTER,
    isListening: false,
    hiddenLayers: DEFAULT_HIDDEN_LAYERS,
    layers: [],
    coordinateInputValue: "",
    query: "",
    showFireHistoryAnimation: false,
    fireHistoryIndex: 0,
    popup: null,
  };

  constructor(props) {
    super(props);
    this.escFunction = this.escFunction.bind(this);
    const query = queryString.parse(this.props.location.search);
    this.mapRef = React.createRef();
    if (query.coord) {
      this.state.query = query.coord;
      this.state.coordinateInputValue = query.coord;
    }
  }

  componentDidMount() {
    this.fireClickHandler();
    document.addEventListener("keydown", this.escFunction, false);
  }
  escFunction(event){
    if(event.keyCode === 27) {
      this.setState({
        popup: null
      })
    }
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
  }

  render() {
    const FIRMSModisLayer = this.props.FIRMSLatestModis24
      ? FIRMSLayer("firms-modis", this.props.FIRMSLatestModis24)
      : [];
    const FIRMSViirsLayer = this.props.FIRMSLatestViirs24
      ? FIRMSLayer("firms-viirs", this.props.FIRMSLatestViirs24)
      : [];
    const GoesLayer = this.props.GoesLatest
      ? GOESLayer("goes", this.props.GoesLatest)
      : [];
    const allLayers = [
      ...layers,
      ...this.state.layers,
      ...FIRMSModisLayer,
      ...FIRMSViirsLayer,
      ...GoesLayer,
    ];
    return (
      <div>
        <MainMap
          onClick={this.mapClickHandler}
          onStyleLoad={(el) => {
            this.map = el;
            if (this.state.query) {
              this.coordinateSubmitHandler(false, true);
            }
          }}
          ref={this.mapRef}
          style={MAPBOX_DEFAULT_STYLE}
          center={this.state.center}
          containerStyle={{
            height: "100vh",
            width: "100vw",
          }}
          antialias={true}
        >
          <MapLayers
            layers={allLayers}
            hiddenLayers={this.state.hiddenLayers}
          />

          { this.state.popup ? 
            <Popup
              coordinates={[this.state.popup.lng, this.state.popup.lat]}
              offset={{
                'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
              }}>
              {this.state.popup.title ? <h1>{this.state.popup.title}</h1> : null }
              <em>{this.state.popup.lng}, {this.state.popup.lat}</em>
            </Popup>
          : null}        


        </MainMap>

        <IconButtonSwitch
          loading={!this.state.firmsDataWasLoaded}
          right={64}
          backgroundImage="fire-emoji.png"
          value={this.state.showFIRMS}
          onClick={this.fireClickHandler}
        />
       
        <CoordinateInput
          value={this.state.coordinateInputValue}
          onChange={this.coordinateChangeHandler}
          onSubmit={(event) => this.coordinateSubmitHandler(event, true)}
        />

      </div>
    );
  }

  fireClickHandler = () => {
    this.switchFIRMSLayer();
  };

  mapClickHandler = (clickEvent, mapEvent) => {
    this.setState({
      popup: { 
        lat: mapEvent.lngLat.lat,
        lng: mapEvent.lngLat.lng,
      }
    })
  };

  coordinateChangeHandler = (value) => {
    this.setState({
      coordinateInputValue: value,
    });
  };

  coordinateSubmitHandler = (coordinateValue, fly) => {
    let value;
    let coords;

    if (!coordinateValue) {
      value = this.state.coordinateInputValue;
      coords = value.split(" ");
    } else {
      coords = coordinateValue;
    }

    if (coords.length === 2) {
      try {
        const myLayer = CoordinatePointLayer(coords);
        let updatedLayers;
        updatedLayers = [myLayer];

        this.setState({
          layers: updatedLayers,
        });
        if (fly === true) {
          this.map.flyTo({
            center: coords,
            zoom: [15],
          });
        }
      } catch (e) {
        console.log("Coordinate error", e);
      }
    }
  };

  switchFIRMSLayer() {
    if (this.state.showFIRMS) {
      console.log("HERE 1")
      const hiddenLayers = [
        ...this.state.hiddenLayers,
        "firms-modis",
        "firms-viirs",
        "goes",
      ];
      this.setState({
        hiddenLayers: hiddenLayers,
        showFIRMS: false,
      });
    } else {
      console.log("HERE 2")
      if (!this.state.firmsDataWasLoaded) {
        console.log("HERE 3")
        this.props.FIRMSLatestModis24Action();
        this.props.FIRMSLatestViirs24Action();
        this.props.GoesLatestAction();
        console.log("HERE 4")
        this.setState({
          firmsDataWasLoaded: true,
        });
      }
      const hiddenLayers = [...this.state.hiddenLayers];
      hiddenLayers.splice(hiddenLayers.indexOf("firms-modis"), 1);
      hiddenLayers.splice(hiddenLayers.indexOf("firms-viirs"), 1);
      hiddenLayers.splice(hiddenLayers.indexOf("goes"), 1);
      this.setState({
        hiddenLayers: hiddenLayers,
        showFIRMS: true,
      });
    }
  }
}
const mapStateToProps = (state) => ({
  FIRMSLatestModis24: getFIRMSLatestModis24GeoJSON(state),
  FIRMSLatestViirs24: getFIRMSLatestViirs24GeoJSON(state),
  GoesLatest: getLatestGoesGeoJSON(state),
});

const mapDispatchToProps = (dispatch) => ({
  FIRMSLatestModis24Action: () => dispatch(FIRMSLatestModis24Action),
  FIRMSLatestViirs24Action: () => dispatch(FIRMSLatestViirs24Action),
  GoesLatestAction: () => dispatch(GoesLatestAction),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Cockpit));
