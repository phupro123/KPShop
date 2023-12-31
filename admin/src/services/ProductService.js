import { axiosInstance } from "../api/axios.config";

const getProducts = async (params) => {
  const response = await axiosInstance.get("/product/all", { params });

  return {
    data: response.data.map((item) => {
      return { ...item, discount: Number(item.discount) * 100 };
    }),
    meta: {
      total: response.total,
    },
  };
};

const getProductById = async (id) => {
  let res = await axiosInstance.get(`/product/get/${id}`);
  return res;
};

const createProduct = async (data,axiosJWT) => {
  let res = await axiosJWT.post("/product/new", {
    ...data,
    discount: (data.discount / 100).toFixed(2),
  });
  return res;
};

const updateProductById = async (id, data,axiosJWT) => {
  let res = await axiosJWT.put(`/product/edit/${id}`, {
    ...data,
    discount: (data.discount / 100).toFixed(2),
  });
  return res;
};

const deleteProductById = async (id,axiosJWT) => {
  let res = await axiosJWT.delete(`/product/delete/${id}`);
  return res;
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
};
