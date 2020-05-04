import axios from "axios";
import {getToken, logout} from "./auth";

const api = axios.create({
    baseURL: 'http://localhost:3333'
});

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(async config => {
    if (config.status === 403) {
        logout();
    }

    return config;
});

export default api;
