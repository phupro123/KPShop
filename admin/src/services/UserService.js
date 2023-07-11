import { login, logout } from "../redux/user/userSlice";
import { axiosInstance } from "../api/axios.config";

const getUsers = async (axiotJWT, params) => {
  const response = await axiotJWT.get("/user/all", { params });

  return {
    data: response.data,
    meta: {
      total: response.total,
    },
  };
};

const getUserById = async (id, axiotJWT) => {
  let res = await axiotJWT.get(`/user/get/${id}`);
  return res;
};

const createUser = async (data) => {
  let res = await axiosInstance.post("/user/new", data);
  return res;
};

const updateUserById = async (id, data) => {
  let res = await axiosInstance.put(`/user/edit/${id}`, data);
  return res;
};

const deleteUserById = async (id) => {
  let res = await axiosInstance.delete(`/user/delete/${id}`);
  return res;
};

const setAccessToken = (accessToken) => {
  localStorage.setItem("accessToken", JSON.stringify(accessToken));
};

const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return null;
  }

  return JSON.parse(accessToken);
};

const removeAccessToken = () => {
  localStorage.removeItem("accessToken");
};

const _login = async (data, dispatch, navigate) => {
  let res = await axiosInstance.post("/auth/loginAdmin", data);
  dispatch(login(res));
  setAccessToken(res.accessToken);
  if (res) {
    navigate("/");
  }
};

const _logout = async (dispatch, navigate) => {
  new Promise(() => {
    setTimeout(() => {
      dispatch(logout());
      removeAccessToken();
      navigate("/");
    }, 1000);
  });
};

export {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  setAccessToken,
  getAccessToken,
  _login,
  _logout,
};
