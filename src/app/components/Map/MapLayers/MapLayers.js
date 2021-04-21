import React from 'react';
import { GeoJSONLayer } from 'react-mapbox-gl';

const MapLayers = (props) => {
    let layers = [];
    props.layers.map(layer => {
        if (props.hiddenLayers.indexOf(layer.id) === -1) {
            if (layer.data) {
                layers.push(<GeoJSONLayer
                    id={layer.id}
                    name={layer.id}
                    key={layer.id}
                    data={layer.data || null}
                    symbolLayout={layer.symbolLayout}
                    symbolPaint={layer.symbolPaint}
                    linePaint={layer.linePaint}
                    circlePaint={layer.circlePaint}
                    fillPaint={layer.fillPaint}
                    circleOnClick={(e) => {
                        console.log(e.lngLat)
                    }}
                />)
            } else {
                layers.push(layer.layer);
            }
        }
    })
    return layers;
};

export default MapLayers;