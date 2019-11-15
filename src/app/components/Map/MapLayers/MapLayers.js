import React from 'react';
import { GeoJSONLayer } from 'react-mapbox-gl';

const MapLayers = (props) => (
    props.layers.map(layer => {
        if (props.hiddenLayers.indexOf(layer.id) === -1) {
            if (layer.data) {
                return <GeoJSONLayer
                    key={layer.id}
                    data={layer.data || null}
                    symbolLayout={layer.symbolLayout}
                    symbolPaint={layer.symbolPaint}
                    linePaint={layer.linePaint}
                    circlePaint={layer.circlePaint}
                    fillPaint={layer.fillPaint}
                />
            } else {
                return layer.layer;
            }
        }
        return null;
    })
);

export default MapLayers;