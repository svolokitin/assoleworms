import { API_SERVER_URL } from './config.js';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_SERVER_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('AccessToken')}`
    return config;
})

export default $api;
