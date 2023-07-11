import axios from "axios";
import { normalizeQueryParams } from "../services/CommonService";
import { isEmpty, omit } from "lodash";

const baseURL = "http://localhost:8000";

const axiosInstance = axios.create({
  credentials: 'include', 
  withCredentials: true,
  baseURL,
});

axiosInstance.interceptors.request.use(
  function (req) {
    const { params } = req;

    if (!params) {
      return req;
    }

    const { sort } = params;

    if (isEmpty(sort)) {
      return req;
    }

    const normalizedSortParams = sort?.reduce((acc, { id, desc }) => {
      acc[id] = desc ? -1 : 1;

      return acc;
    }, {});

    console.log(normalizedSortParams);

    req.params = {
      ...omit(req.params, ["sort"]),
      sort: normalizedSortParams,
    };
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
