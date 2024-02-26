import axios from "axios";

const baseUrl = "http://localhost:8080";

export const api = axios.create();

api.interceptors.request.use((config) => {
    config = {
        ...config,
        baseURL,
    };
    return config;
})