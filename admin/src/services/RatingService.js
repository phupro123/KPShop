import { axiosInstance } from "../api/axios.config";

const getRatings = async (params) => {
  const response = await axiosInstance.get("/rating/all", { params });

  return {
    data: response.data,
    meta: {
      total: response.total,
    },
  };
};

const getRatingByProduct = async (id) => {
  let res = await axiosInstance.get(`rating/get/${id}`);
  return res;
};

const createRating = async (data) => {
  let res = await axiosInstance.post("rating/new", data);
  return res;
};

const updateRatingById = async (id, data) => {
  let res = await axiosInstance.put(`/rating/edit/${id}`, data);
  return res;
};

const deleteRatingById = async (id,axiosJWT) => {
  let res = await axiosJWT.delete(`/rating/delete/${id}`);
  return res;
};

const getRatingsPage = async (page) => {
  let res = await axiosInstance.get(`rating/paging/${page}`);
  return res;
};

export {
  getRatings,
  getRatingByProduct,
  createRating,
  updateRatingById,
  deleteRatingById,
  getRatingsPage,
};
