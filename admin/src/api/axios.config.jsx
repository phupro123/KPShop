import axios from "axios";

const baseURL = "https://kpshop-backend.onrender.com";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Access-Control-Allow-Origin": "true",
    "Content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (req) {
    return req;
  },

  function (error) {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  function (res) {
    return res.data;
  },

  function (error) {
    return Promise.reject(error);
  }
);
export { axiosInstance, baseURL };
