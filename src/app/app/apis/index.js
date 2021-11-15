import axios from 'axios';
import Cookies from 'js-cookie';

import { 
    MODIS_24_URL, 
    VIIRS_24_URL,
    GOES_URL,
    API_BASE_URL,
} from '../../../config/config';

const api = axios.create({ baseURL: API_BASE_URL, withCredentials: true });

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
    },
    getLatestGoes: function () {
        return axios({
            url: GOES_URL
        })
    },
    postAccountToken: function (email, password) {
        return api.post(`v1/accounts/login/`, {
            email,
            password
        })
    },
    logout: function () {
        console.log(Cookies.get());
        return api.post(`v1/accounts/logout/`,{}, {headers:{'X-CSRFToken':Cookies.get('c') }})
    },
    getMe: function () {
        return api.get(`v1/accounts/me/`);
    },
    getUserLayers: function () {
        return api.get(`v1/layers/`);
    }
};

export default API;
