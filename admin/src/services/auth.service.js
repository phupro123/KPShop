import { axiosInstance, baseURL } from "~/api/axios.config";

class AuthService {
 

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem('token')
    localStorage.removeItem('expiresAt')
  }

  
}

export default new AuthService();
