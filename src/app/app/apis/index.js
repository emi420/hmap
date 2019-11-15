import axios from 'axios';

import { MODIS_24_URL, VIIRS_24_URL } from '../../../config/config';

const API = {
    getLatestModis24: function () {
        return axios({
            url: MODIS_24_URL,
        })
    },
    getLatestViirs24: function () {
        return axios({
            url: VIIRS_24_URL
        })
    }
};

export default API;

/*

// Buildings inside Colón, Córdoba

[out:json];

area[name="Córdoba"]->.b;
rel(area.b)[name="Departamento Colón"];
map_to_area -> .a;


way["building"](area.a);
out geom;

relation["building"](area.a);out;
way(r)[!"building:part"];
out geom;
*/

// --------

/*

// Fire nodes

[out:json];

area[name="Córdoba"]->.b;

node["emergency"~"^fire"](area.b);
out;

node[~"^fire_.*$"~"."](area.b);
out;
*/