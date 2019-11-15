import React from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import MapLayers from './MapLayers/MapLayers';
import {
    MAPBOX_ACCESS_TOKEN,
    MAPBOX_DEFAULT_STYLE,
} from '../../../config/config';

const MainMap = ReactMapboxGl({
  accessToken: MAPBOX_ACCESS_TOKEN
});

const Map = (props) => (
    <MainMap
        // eslint-disable-next-line react/style-prop-object
        style={MAPBOX_DEFAULT_STYLE}
        center={props.center}
        zoom={props.zoom}
        containerStyle={{
            height: '100vh',
            width: '100vw'
        }}
        antialias={true}
      > 
        <MapLayers 
            onDTMFDecode={props.onDTMFDecode}
            layers={props.layers}
            hiddenLayers={props.hiddenLayers}
        />
        
    </MainMap>
)

export default Map;
