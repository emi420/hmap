const layers = [
    // {   
    //     id: 'big-fires',
    //     type: 'OrderedGroup',
    //     layers: [
    //         {
    //             name: "1976",
    //             id: 'big-fires-1976',
    //             data: './data/bigfires-1976.geojson',
    //             fillPaint: {
    //                 'fill-color': 'red',
    //                 'fill-opacity': .2,
    //             },
    //         },
    //         {
    //             name: "1980",
    //             id: 'big-fires-1980',
    //             data: './data/bigfires-1980.geojson',
    //             fillPaint: {
    //                 'fill-color': 'red',
    //                 'fill-opacity': .2,
    //             },
    //         },
    //         {
    //             name: "1981",
    //             id: 'big-fires-1981',
    //             data: './data/bigfires-1981.geojson',
    //             fillPaint: {
    //                 'fill-color': 'red',
    //                 'fill-opacity': .2,
    //             },
    //         },
    //         {
    //             name: "1982",
    //             id: 'big-fires-1982',
    //             data: './data/bigfires-1982.geojson',
    //             fillPaint: {
    //                 'fill-color': 'red',
    //                 'fill-opacity': .2,
    //             },
    //         },
    //         {
    //             name: "1983",
    //             id: 'big-fires-1983',
    //             data: './data/bigfires-1983.geojson',
    //             fillPaint: {
    //                 'fill-color': 'red',
    //                 'fill-opacity': .2,
    //             },
    //         },
    //         {
    //             name: "1986",
    //             id: 'big-fires-1986',
    //             data: './data/bigfires-1986.geojson',
    //             fillPaint: {
    //                 'fill-color': 'red',
    //                 'fill-opacity': .2,
    //             },
    //         },
    //         {
    //             name: "1988",
    //             id: 'big-fires-1988',
    //             data: './data/bigfires-1988.geojson',
    //             fillPaint: {
    //                 'fill-color': 'red',
    //                 'fill-opacity': .2,
    //             },
    //         },
    //         {
    //             name: "1989",
    //             id: 'big-fires-1989',
    //             data: './data/bigfires-1989.geojson',
    //             fillPaint: {
    //                 'fill-color': 'red',
    //                 'fill-opacity': .2,
    //             },
    //         },
    //         {
    //             name: "1990",
    //             id: 'big-fires-1990',
    //             data: './data/bigfires-1990.geojson',
    //             fillPaint: {
    //                 'fill-color': 'red',
    //                 'fill-opacity': .2,
    //             },
    //         },
    //         {
    //             name: "1991",
    //             id: 'big-fires-1991',
    //             data: './data/bigfires-1991.geojson',
    //             fillPaint: {
    //                 'fill-color': 'red',
    //                 'fill-opacity': .2,
    //             },
    //         },
    //         {
    //             name: "1992",
    //             id: 'big-fires-1992',
    //             data: './data/bigfires-1992.geojson',
    //             fillPaint: {
    //                 'fill-color': 'red',
    //                 'fill-opacity': .2,
    //             },
    //         },
    //         {
    //             name: "1993",
    //             id: 'big-fires-1993',
    //             data: './data/bigfires-1993.geojson',
    //             fillPaint: {
    //                 'fill-color': 'red',
    //                 'fill-opacity': .2,
    //             },
    //         },
    //         {
    //             name: "2000",
    //             id: 'big-fires-2000',
    //             data: './data/bigfires-2000.geojson',
    //             fillPaint: {
    //                 'fill-color': 'red',
    //                 'fill-opacity': .2,
    //             },
    //         },
    //         {
    //             name: "2002",
    //             id: 'big-fires-2002',
    //             data: './data/bigfires-2002.geojson',
    //             fillPaint: {
    //                 'fill-color': 'red',
    //                 'fill-opacity': .2,
    //             },
    //         },
    //         {
    //             name: "2003",
    //             id: 'big-fires-2003',
    //             data: './data/bigfires-2003.geojson',
    //             fillPaint: {
    //                 'fill-color': 'red',
    //                 'fill-opacity': .2,
    //             },
    //         },
    //         {
    //             name: "2008",
    //             id: 'big-fires-2008',
    //             data: './data/bigfires-2008.geojson',
    //             fillPaint: {
    //                 'fill-color': 'red',
    //                 'fill-opacity': .2,
    //             },
    //         },
    //         {
    //             name: "2011",
    //             id: 'big-fires-2011',
    //             data: './data/bigfires-2011.geojson',
    //             fillPaint: {
    //                 'fill-color': 'red',
    //                 'fill-opacity': .2,
    //             },
    //         },
    //         {
    //             name: "2013",
    //             id: 'big-fires-2013',
    //             data: './data/bigfires-2013.geojson',
    //             fillPaint: {
    //                 'fill-color': 'red',
    //                 'fill-opacity': .2,
    //             },
    //         },
    //         {
    //             name: "2017",
    //             id: 'big-fires-2017',
    //             data: './data/bigfires-2017.geojson',
    //             fillPaint: {
    //                 'fill-color': 'red',
    //                 'fill-opacity': .2,
    //             },
    //         },
    //     ]
    // },
    // {
    //     id: 'area-line',
    //     data: './data/areas.geojson',
    //     linePaint: {
    //         'line-color': 'red',
    //         'line-width': 2,
    //         'line-dasharray': [7, 4]
    //     },
    // },
    // {
    //     id: 'area-label',
    //     data: './data/areas.geojson',
    //     symbolLayout: {
    //         "text-field": "Jurisdicción 113",
    //         "symbol-placement": "line",
    //         "text-size": 10,
    //     },
    //     symbolPaint: {
    //         "text-color": "white",
    //         "text-halo-color": "#a00010",
    //         "text-halo-width": 2,
    //     },
    // },
    // {
    //     id: 'tracks',
    //     data: './data/tracks.geojson',
    //     linePaint: {
    //         'line-color': 'rgba(255,255,255,.65)',
    //         'line-width': .5,
    //         'line-dasharray': [2, 2]
    //     },
    // },
    // {
    //     id: 'pircas-line',
    //     data: './data/pircas.geojson',
    //     linePaint: {
    //         'line-color': 'rgba(255,255,255,.5)',
    //         'line-width': .5,
    //         'line-dasharray': [6, 6]
    //     },
    // },
    // {
    //     id: 'pircas-label',
    //     data: './data/pircas.geojson',
    //     symbolLayout: {
    //         "text-field": "Pirca",
    //         "symbol-placement": "line",
    //         "text-size": 7,
    //     },
    //     symbolPaint: {
    //         "text-color": "white",
    //         "text-halo-color": "#333333",
    //         "text-halo-width": 2,
    //     },
    // },
    // {
    //     id: 'agreements-line',
    //     data: './data/agreements.geojson',
    //     linePaint: {
    //         'line-color': '#b301ff',
    //         'line-width': 1,
    //     },
    // },
    // {
    //     id: 'agreements-label',
    //     data: './data/agreements.geojson',
    //     symbolLayout: {
    //         "text-field": "{Nombre}",
    //         "symbol-placement": "line",
    //         "text-size": 10,
    //     },
    //     symbolPaint: {
    //         "text-color": "white",
    //         "text-halo-color": "#b301ff",
    //         "text-halo-width": 2,
    //     }
    // },
    // {
    //     id: 'pois',
    //     data: './data/pois.geojson',
    //     symbolPaint: {
    //         "text-color": "white",
    //         "text-halo-color": "rgba(0,0,0,.75)",
    //         "text-halo-width": 1,
    //     },
    //     symbolLayout: {
    //         "text-field": "{name}",
    //         "text-size": 10,
    //         "text-offset": [0, 0.6],
    //         "text-anchor": "top",
    //     },
    //     circlePaint: {
    //         "circle-radius": 2,
    //         "circle-color": "white",
    //     }
    // },
];

export const DEFAULT_HIDDEN_LAYERS = ['big-fires', 'firms-modis', 'firms-viirs']
// export const DEFAULT_HIDDEN_LAYERS = ['firms-modis', 'firms-viirs']

export default layers;
