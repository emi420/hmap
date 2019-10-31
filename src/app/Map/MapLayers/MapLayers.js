import React from 'react';
import { GeoJSONLayer } from 'react-mapbox-gl';

const MapLayers = (props) => (
    props.layers.map(layer => (
        props.hiddenLayers.indexOf(layer.id) === -1 ?
        <GeoJSONLayer
            key={layer.id}
            data={layer.data}
            symbolLayout={layer.symbolLayout}
            symbolPaint={layer.symbolPaint}
            linePaint={layer.linePaint}
            circlePaint={layer.circlePaint}
            fillPaint={layer.fillPaint}
        /> : null
    ))
);

export default MapLayers;