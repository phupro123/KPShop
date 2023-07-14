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

const createUser = async (data, axiotJWT) => {
  let res = await axiotJWT.post("/user/new", data);
  return res;
};

const updateUserById = async (id, data, axiotJWT) => {
  let res = await axiotJWT.put(`/user/edit/${id}`, data);
  return res;
};

const updateUserStatusById = async (id, status, axiotJWT) => {
  let res = await updateUserById(id, { status }, axiotJWT);
  return res;
};

const deleteUserById = async (id, axiotJWT) => {
  let res = await axiotJWT.delete(`/user/delete/${id}`);
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

const _checkRequest = async (dispatch) => {
  new Promise(() => {
    setTimeout(() => {
      dispatch(logout());
      removeAccessToken();
    }, 500);
  });
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
  updateUserStatusById,
  deleteUserById,
  setAccessToken,
  getAccessToken,
  _login,
  _logout,
  _checkRequest,
};
