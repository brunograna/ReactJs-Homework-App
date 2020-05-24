import axios from "axios";
import {getToken, logout} from "./auth";

const api = axios.create({
    baseURL: 'http://10.0.0.104:3333'
});

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token.replace(/['"]+/g, '')}`;
    }
    return config;
});

api.interceptors.response.use(function(response) {
    return response;
}, function(error) {
    console.log("Response interceptor - "+error.response.status);
    if (401 ===  error.response.status) {
        console.log("401 - Response");
        logout();
    }
    throw error;
});

export default api;
