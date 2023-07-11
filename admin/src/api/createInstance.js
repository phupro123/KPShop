import axios from "axios";
import jwt_decode from "jwt-decode";
import { UserService } from "../services";

const baseURL = "http://localhost:8000";

const refreshToken = async () => {
  try {
    const res = await axios.post("http://localhost:8000/auth/refresh", {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createAxios = (user, dispatch, stateSuccess) => {
  const accessToken = UserService.getAccessToken();
  const newInstance = axios.create({
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
        console.log({ data });
        const refreshUser = {
          ...user,
          accessToken: data?.accessToken,
        };
        dispatch(stateSuccess(refreshUser));
        config.headers["token"] = "Bearer " + data?.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};
