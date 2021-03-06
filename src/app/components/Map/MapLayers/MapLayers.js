import React from 'react';
import { GeoJSONLayer } from 'react-mapbox-gl';

const MapLayers = (props) => {
    let layers = [];
    props.layers.map(layer => {
        if (props.hiddenLayers.indexOf(layer.id) === -1) {
            if (layer.type === 'OrderedGroup') {
                layers = layer.layers.map(orderedLayer => (
                    <GeoJSONLayer
                        id={orderedLayer.id}
                        name={orderedLayer.id}
                        key={orderedLayer.id}
                        data={orderedLayer.data || null}
                        symbolLayout={orderedLayer.symbolLayout}
                        symbolPaint={orderedLayer.symbolPaint}
                        linePaint={orderedLayer.linePaint}
                        circlePaint={orderedLayer.circlePaint}
                        fillPaint={orderedLayer.fillPaint}
                    />
                )) 
            } else if (layer.data) {
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
                />)
            } else {
                layers.push(layer.layer);
            }
        }
    })
    return layers;
};

export default MapLayers;