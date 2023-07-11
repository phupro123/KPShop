import { axiosInstance, baseURL } from "~/api/axios.config";

class AuthService {
  async login(email, password) {
    const { data } = await axiosInstance.post(`${baseURL.auth}/login`, {
      email,
      password,
    });
    return data;
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem('token')
    localStorage.removeItem('expiresAt')
  }

  forgotPassword(email) {
    return axiosInstance.post("/auth/forgot-password", {
      email,
    });
  }

  checkToken(token, email) {
    return axiosInstance.post("auth/check-token", {
      token,
      email,
    });
  }

  resetPassword(token, email, password, password2) {
    return axiosInstance.post("auth/reset-password", {
      token,
      email,
      password,
      password2,
    });
  }

  register(username, email, password) {
    return axiosInstance.post("auth/signup", {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return axiosInstance.get("/users/profile");
  }
}

export default new AuthService();
