import axios from 'axios';

// const baseURL = 'https://kpshop-backend.onrender.com';
const baseURL = 'http://localhost:8000';
const axiosClient = axios.create({
    baseURL,
    headers: {
        'Access-Control-Allow-Credentials': true,
        'Content-type': 'application/json',
    },
    credentials: 'include', 
    withCredentials: true,
});

axiosClient.interceptors.request.use(
    function (req) {
        return req;
    },

    function (error) {
        return Promise.reject(error);
    },
);
axiosClient.interceptors.response.use(
    function (res) {
        return res.data;
    },

    function (error) {
        return Promise.reject(error);
    },
);
export default axiosClient;
