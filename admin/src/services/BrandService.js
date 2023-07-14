import { axiosInstance } from "../api/axios.config";

const getBrands = async (params) => {
  const response = await axiosInstance.get("/brand/all", { params });

  return {
    data: response.data,
    meta: {
      total: response.total,
    },
  };
};

const getBrandById = async (id) => {
  let res = await axiosInstance.get(`/brand/get/${id}`);
  return res;
};

const getBrandsByCategory = async (category) => {
  let res = await axiosInstance.get(`/brand/get/category/${category}`);
  return res;
};

const createBrand = async (data,axisosJWT) => {
  let res = await axisosJWT.post("/brand/new", data);
  return res;
};

const updateBrandById = async (id, data,axisosJWT) => {
  let res = await axisosJWT.put(`/brand/edit/${id}`, data);
  return res;
};

const deleteBrandById = async (id,axisosJWT) => {
  let res = await axisosJWT.delete(`/brand/delete/${id}`);
  return res;
};

export {
  getBrands,
  getBrandById,
  getBrandsByCategory,
  createBrand,
  updateBrandById,
  deleteBrandById,
};
