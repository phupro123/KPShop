import axios from "axios";
import jwt_decode from "jwt-decode";
import axiosClient from "./axios.config";
import { _logout } from "../redux/user/userApi";

// const baseURL = 'https://kpshop-backend.onrender.com'
const baseURL = 'http://localhost:8000';
const refreshToken = async () => {
  try {
    const res = await axiosClient.post("/auth/refresh");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createAxios = (user, dispatch, stateSuccess) => {
  const newInstance = axios.create({
    baseURL,
    credentials: 'include', 
    withCredentials: true,
    
  });
  newInstance.interceptors.response.use(
    function (res) {
        return res.data;
    },

    function (error) {
        return Promise.reject(error);
    },
  )
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwt_decode(user?.accessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        if(data==undefined){
          _logout(dispatch)
        }
        else{
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        };
        dispatch(stateSuccess(refreshUser));
        }
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};
