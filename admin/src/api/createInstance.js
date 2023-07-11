import axios from "axios";
import jwt_decode from "jwt-decode";
import { UserService } from "../services";
import { axiosInstance } from "./axios.config";
import { _checkRequest } from "../services/UserService";
const baseURL = "http://localhost:8000";

const refreshToken = async () => {
  try {
    const res = await axiosInstance.post("/auth/refresh");

    return res;
  } catch (err) {
    console.log(err);
  }
};

export const createAxios = (user, dispatch, stateSuccess) => {
  const accessToken = UserService.getAccessToken();
  const newInstance = axios.create({
    credentials: 'include', 
    withCredentials: true,
    baseURL,
    headers: {
      token: `Bearer ${accessToken}`,
    },
    
  
  });
  newInstance.interceptors.response.use(
    function (res) {
      return res.data;
    },

    function (error) {
      return Promise.reject(error);
    }
  );
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwt_decode(accessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        
        if(data==undefined){
          _checkRequest(dispatch)
        }
        else{
          const refreshUser = {
            ...user,
            accessToken: data?.accessToken,
          };
          dispatch(stateSuccess(refreshUser));
          config.headers["token"] = "Bearer " + data?.accessToken;
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
