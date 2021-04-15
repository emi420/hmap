import axios from 'axios';

import { 
    MODIS_24_URL, 
    VIIRS_24_URL,
} from '../../../config/config';

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
