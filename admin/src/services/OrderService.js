import { axiosInstance } from "../api/axios.config";

const getOrders = async (params) => {
  const response = await axiosInstance.get("/order/all", { params });

  return {
    data: response.data,
    meta: {
      total: response.total,
    },
  };
};

const getOrderById = async (data) => {
  let res = await axiosInstance.get(`order/getbyid/${data}`);
  return res;
};

const updateOrderById = async (data) => {
  let res = await axiosInstance.put(`/order/edit/${data._id}`, data);
  return res;
};

export { getOrders, getOrderById, updateOrderById };
