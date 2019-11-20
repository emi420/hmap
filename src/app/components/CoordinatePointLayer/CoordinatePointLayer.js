import React from 'react';
import { Layer, Feature } from 'react-mapbox-gl';

const CoordinatePointLayer = (coords) => {
    return  {
        id: Math.random().toString(),
        layer:
            <Layer type="circle" key={Math.random().toString()} paint={{
                "circle-radius": 10,
                "circle-color": "green",
            }}>
                <Feature coordinates={coords} />
            </Layer>
    };
}

export default CoordinatePointLayer;
