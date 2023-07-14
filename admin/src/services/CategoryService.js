import { axiosInstance } from "../api/axios.config";

const getCategories = async (params) => {
  const response = await axiosInstance.get("/category/all", { params });

  return {
    data: response.data,
    meta: {
      total: response.total,
    },
  };
};

const getCategoryById = async (id) => {
  let res = await axiosInstance.get(`/category/get/${id}`);
  return res;
};

const createCategory = async (data,axiosJWT) => {
  let res = await axiosJWT.post("/category/new", data);
  return res;
};

const updateCategoryById = async (id, data,axiosJWT) => {
  let res = await axiosJWT.put(`/category/edit/${id}`, data);
  return res;
};

const deleteCategoryById = async (id,axiosJWT) => {
  let res = await axiosJWT.delete(`/category/delete/${id}`);
  return res;
};

export {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
};
