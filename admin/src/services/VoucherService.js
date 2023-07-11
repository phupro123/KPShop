import { axiosInstance } from "../api/axios.config";

const getVouchers = async (params) => {
  const response = await axiosInstance.get("/voucher/all", { params });

  return {
    data: response.data.map((item) => {
      return { ...item, sale: item.sale * 100 };
    }),
    meta: {
      total: response.total,
    },
  };
};

const getVoucherById = async (id) => {
  let res = await axiosInstance.get(`/voucher/get/${id}`);
  return res;
};

const createVoucher = async (data) => {
  let res = await axiosInstance.post("/voucher/new", data);
  return res;
};

const updateVoucherById = async (id, data) => {
  let res = await axiosInstance.put(`/voucher/edit/${id}`, data);
  return res;
};

const deleteVoucherById = async (id) => {
  let res = await axiosInstance.delete(`/voucher/delete/${id}`);
  return res;
};

export {
  getVouchers,
  getVoucherById,
  createVoucher,
  updateVoucherById,
  deleteVoucherById,
};
