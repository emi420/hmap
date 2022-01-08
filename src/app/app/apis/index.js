import axios from 'axios';
import Cookies from 'js-cookie';
import LocalStorageService from "../../lib/localStorageService";
import createAxiosInterceptors from "../../lib/createAxiosInterceptors";

import {
    API_BASE_URL,
} from '../../../config/config';

const localStorageService = LocalStorageService.getService();

const api = axios.create({ baseURL: API_BASE_URL, withCredentials: true });
// Related to #37: handle auto JWT access and refresh token headers
// (include headers and try to refresh it when we get 403)
// Approach based on https://medium.com/swlh/handling-access-and-refresh-tokens-using-axios-interceptors-3970b601a5da
createAxiosInterceptors(api);

const API = {
    postAccountToken: function (email, password) {
        return api.post(`v1/token/`, {
            email,
            password
        })
    },
    logout: function () {
        console.log(Cookies.get());
        // TODO: implement logout / token blacklist
        // server side. See https://medium.com/django-rest/logout-django-rest-framework-eb1b53ac6d35
        localStorageService.clearToken();
        // return api.post(`v1/accounts/logout/`)
    },
    getMe: function () {
        return api.get(`v1/accounts/me/`);
    },
    getUserLayers: function () {
        return api.get(`v1/layers/`);
    }
};

export default API;
