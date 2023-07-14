import { axiosInstance } from "../api/axios.config";

const getVouchers = async (params,axiosJWT) => {
  const response = await axiosJWT.get("/voucher/all", { params });

  return {
    data: response.data.map((item) => {
      return { ...item, sale: item.sale * 100 };
    }),
    meta: {
      total: response.total,
    },
  };
};

const getVoucherById = async (id,axiosJWT) => {
  let res = await axiosJWT.get(`/voucher/get/${id}`);
  return res;
};

const createVoucher = async (data,axiosJWT) => {
  let res = await axiosJWT.post("/voucher/new", data);
  return res;
};

const updateVoucherById = async (id, data,axiosJWT) => {
  let res = await axiosJWT.put(`/voucher/edit/${id}`, data);
  return res;
};

const deleteVoucherById = async (id,axiosJWT) => {
  let res = await axiosJWT.delete(`/voucher/delete/${id}`);
  return res;
};

export {
  getVouchers,
  getVoucherById,
  createVoucher,
  updateVoucherById,
  deleteVoucherById,
};
