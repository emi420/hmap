import React from 'react';
import ReactMapboxGl, { GeoJSONLayer } from 'react-mapbox-gl';
import { 
    fillStyleFire,
    lineStyle113,
    lineStyleAgreements,
    layoutStyleAgreements,
    symbolPaintStyleAgreements,
    lineLayoutStyle113,
    linePaintStyle113,
    circleLayoutStylePois,
    circlePaintStylePois,
    symbolPaintLayoutStylePois,
    lineTracksStyles,
    linePircasStyles,
    layoutPircasStyles,
    symbolPaintPircasStyles
} from './MapStyles';

import BigFiresLayer from  '../../static/bigfires.geojson';
import Layer113 from  '../../static/113.geojson';
import AgreementsLayer from  '../../static/agreements.geojson';
import PoisLayer from  '../../static/pois.geojson';
import TracksLayer from '../../static/tracks.geojson';
import PircasLayer from '../../static/pircas.geojson';


const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZW1pNDIwIiwiYSI6ImNqZW9leG5pZTAxYWwyeG83bHU0eHM0ZXcifQ.YWmk4Rp8FBGCLmpx_huJYw';
const MAPBOX_DEFAULT_STYLE = 'mapbox://styles/emi420/ck2divmvv1gip1cpjxumqy761';


const MainMap = ReactMapboxGl({
  accessToken: MAPBOX_ACCESS_TOKEN
});
  
const Map = (props) => (
    <MainMap
        style={MAPBOX_DEFAULT_STYLE}
        center={[-64.273833, -31.006031]}
        containerStyle={{
            height: '100vh',
            width: '100vw'
        }}
        antialias={true}
      >
        <GeoJSONLayer
            data={Layer113}
            linePaint={lineStyle113}
        />
        <GeoJSONLayer
            data={Layer113}
            symbolLayout={lineLayoutStyle113}
            symbolPaint={linePaintStyle113}
        />
        <GeoJSONLayer
            data={TracksLayer}
            linePaint={lineTracksStyles}
        />
        <GeoJSONLayer
            data={PircasLayer}
            linePaint={linePircasStyles}
        />
        <GeoJSONLayer
            data={PircasLayer}
            symbolLayout={layoutPircasStyles}
            symbolPaint={symbolPaintPircasStyles}            
        />

        { props.showFire ?
        <GeoJSONLayer
            data={BigFiresLayer}
            fillPaint={fillStyleFire}
        /> : ''}
        
        <GeoJSONLayer
            data={AgreementsLayer}
            linePaint={lineStyleAgreements}
        />
        <GeoJSONLayer
            data={AgreementsLayer}
            symbolLayout={layoutStyleAgreements}
            symbolPaint={symbolPaintStyleAgreements}
        />
        <GeoJSONLayer
            data={PoisLayer}
            circlePaint={circlePaintStylePois}
            symbolLayout={circleLayoutStylePois}
            symbolPaint={symbolPaintLayoutStylePois}
        />


    </MainMap>
)

export default Map;
