import axios from "axios";
const apiClient = axios.create({
    baseURL: "http://127.0.0.1:3000/hotelManager/v1",
    timeout: 5000,
  });
  
  export const login = async (data) => {
    try {
      const response = await apiClient.post("/auth/login", data);
      return {
        data: {
          token: response.data.token,
          user: response.data.user
        }
      };
    } catch (e) {
      return {
        error: true,
        e,
      };
    }
  };

  apiClient.interceptors.request.use(
    (config) => {
      const userDetails = localStorage.getItem("user");
  
      if (userDetails) {
        try {
          const { token } = JSON.parse(userDetails);
  
          if (token) {
            config.headers["x-token"] = token;
          }
        } catch (error) {
          console.error("Error parsing user data from localStorage", error);
        }
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  export const register = async (data) => {
    try {
      return await apiClient.post("/auth/register", data);
    } catch (e) {
      return {
        error: true,
        e,
      };
    }
  };