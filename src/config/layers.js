const layers = [
    {
        id: 'area-line',
        data: './data/113.geojson',
        linePaint: {
            'line-color': 'red',
            'line-width': 2,
            'line-dasharray': [7, 4]
        },
    },
    {
        id: 'area-label',
        data: './data/113.geojson',
        symbolLayout: {
            "text-field": "Jurisdicción 113",
            "symbol-placement": "line",
            "text-size": 10,
        },
        symbolPaint: {
            "text-color": "white",
            "text-halo-color": "#a00010",
            "text-halo-width": 2,
        },
    },
    {
        id: 'big-fires',
        data: './data/bigfires.geojson',
        fillPaint: {
            'fill-color': 'red',
            'fill-opacity': .1,
        },
    },
    {
        id: 'tracks',
        data: './data/tracks.geojson',
        linePaint: {
            'line-color': 'rgba(255,255,255,.65)',
            'line-width': .5,
            'line-dasharray': [2, 2]
        },
    },
    {
        id: 'pircas-line',
        data: './data/pircas.geojson',
        linePaint: {
            'line-color': 'rgba(255,255,255,.5)',
            'line-width': .5,
            'line-dasharray': [6, 6]
        },
    },
    {
        id: 'pircas-label',
        data: './data/pircas.geojson',
        symbolLayout: {
            "text-field": "Pirca",
            "symbol-placement": "line",
            "text-size": 7,
        },
        symbolPaint: {
            "text-color": "white",
            "text-halo-color": "#333333",
            "text-halo-width": 2,
        },
    },
    {
        id: 'agreements-line',
        data: './data/agreements.geojson',
        linePaint: {
            'line-color': '#b301ff',
            'line-width': 1,
        },
    },
    {
        id: 'agreements-label',
        data: './data/agreements.geojson',
        symbolLayout: {
            "text-field": "{Nombre}",
            "symbol-placement": "line",
            "text-size": 10,
        },
        symbolPaint: {
            "text-color": "white",
            "text-halo-color": "#b301ff",
            "text-halo-width": 2,
        }
    },
    {
        id: 'pois',
        data: './data/pois.geojson',
        symbolPaint: {
            "text-color": "white",
            "text-halo-color": "rgba(0,0,0,.75)",
            "text-halo-width": 1,
        },
        symbolLayout: {
            "text-field": "{name}",
            "text-size": 10,
            "text-offset": [0, 0.6],
            "text-anchor": "top",
        },
        circlePaint: {
            "circle-radius": 2,
            "circle-color": "white",
        }
    },
];

export const DEFAULT_HIDDEN_LAYERS = ['big-fires', 'firms-modis', 'firms-viirs']

export default layers;
