import axios from "axios";
import useAuthStore from '../shared/stores/authStore';

const apiClient = axios.create({
    baseURL: "http://127.0.0.1:3000/hotelManager/v1",
    timeout: 5000,
});
  
export const login = async (data) => {
    try {
      const response = await apiClient.post("/auth/login", data);
      const { token, user } = response.data;
      
      // Guardar en el store de autenticación
      useAuthStore.getState().login(user, token);
      
      return {
        data: {
          token,
          user
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
      const token = useAuthStore.getState().getToken();
  
      if (token) {
        config.headers["x-token"] = token;
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

export const getHotels = async () => {
    try {
      const response = await apiClient.get("/hotels/get");
      return response.data;
    } catch (e) {
      return {
        error: true,
        e,
      };
    }
};

export const getHotelsByAdmin = async () => {
    try {
      const response = await apiClient.get(`/hotels/admin`);
      return response.data;
    } catch (e) {
      return {
        error: true,
        e,
      };
    }
};

export const saveHotel = async (data) => {
    try {
      const response = await apiClient.post("/hotels/save", data);
      return response.data;
    } catch (e) {
      return {
        error: true,
        e,
      };
    }
};
  
export const updateHotel = async (id, data) => {
    try {
      const response = await apiClient.put(`/hotels/upgrade/${id}`, data);
      return response.data;
    } catch (e) {
      return {
        error: true,
        e,  
      };
    }
};
  
export const deleteHotel = async (id) => {
    try {
      const response = await apiClient.delete(`/hotels/delete/${id}`);
      return response.data;
    } catch (e) {
      return {
        error: true,
        e,
      };        
    }
};

export const getManagers = async () => {
    try {
      const response = await apiClient.get("/users/managers");
      return response.data;
    } catch (e) {
      return {
        error: true,
        e,
      };
    }
};
  
  
