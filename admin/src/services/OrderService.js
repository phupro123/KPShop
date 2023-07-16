import { axiosInstance } from "../api/axios.config";

const getOrders = async (axiosJWT, params) => {
  const response = await axiosJWT.get("/order/all", { params });

  return {
    data: response.data,
    meta: {
      total: response.total,
    },
  };
};

const getOrderById = async (axiosJWT, data) => {
  let res = await axiosJWT.get(`order/getbyid/${data}`);
  return res;
};

const updateOrderById = async (axiosJWT, data) => {
  console.log(data);
  let res = await axiosJWT.put(`/order/edit/${data._id}`, data);
  console.log(res);
  return res;
};

export { getOrders, getOrderById, updateOrderById };
