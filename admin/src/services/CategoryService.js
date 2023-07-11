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

const createCategory = async (data) => {
  let res = await axiosInstance.post("/category/new", data);
  return res;
};

const updateCategoryById = async (id, data) => {
  let res = await axiosInstance.put(`/category/edit/${id}`, data);
  return res;
};

const deleteCategoryById = async (id) => {
  let res = await axiosInstance.delete(`/category/delete/${id}`);
  return res;
};

export {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
};
