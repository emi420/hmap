import LocalStorageService from "./localStorageService";
const localStorageService = LocalStorageService.getService();
export default (api) => {
    // Add a request interceptor
    api.interceptors.request.use(
        config => {
            const token = localStorageService.getAccessToken();
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token;
            }
            // config.headers['Content-Type'] = 'application/json';
            return config;
        },
        error => {
            Promise.reject(error)
        });
    api.interceptors.response.use((response) => {
        return response
    },
        function (error) {
            const originalRequest = error.config;
            if (error.response.status === 403 && !originalRequest._retry) {
                const refreshToken = localStorageService.getRefreshToken();
                if (!refreshToken) {
                    // Re-throw the original error if we have no refresh token.
                    throw error;
                }

                originalRequest._retry = true;
                return api.post(`v1/token/refresh/`,
                    {
                        "refresh": localStorageService.getRefreshToken()
                    })
                    .then(res => {
                        if (res.status === 200) {
                            // 1) put token to LocalStorage
                            localStorageService.setToken(res.data);

                            // 2) Change Authorization header
                            api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();

                            // 3) return originalRequest object with Axios.
                            return api(originalRequest);
                        }
                    });
            }

            // return Error object with Promise
            return Promise.reject(error);
        });
}