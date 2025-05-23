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
      useAuthStore.getState().login(user, token);
      return { data: { token, user } };
    } catch (e) {
      return { error: true, e };
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
      return { error: true, e };
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
      return { error: true, e };
    }
};
  
export const updateHotel = async (id, data) => {
    try {
      const response = await apiClient.put(`/hotels/upgrade/${id}`, data);
      return response.data;
    } catch (e) {
      return { error: true, e };
    }
};
  
export const deleteHotel = async (id) => {
    try {
      const response = await apiClient.delete(`/hotels/delete/${id}`);
      return response.data;
    } catch (e) {
      return { error: true, e };
    }
};

export const getManagers = async () => {
    try {
      const response = await apiClient.get("/users/managers");
      return response.data;
    } catch (e) {
      return { error: true, e };
    }
};

// Funciones de servicios 
export const getServices = async () => {
    try {
      const response = await apiClient.get("/services");
      return response.data;
    } catch (e) {
      return { error: true, e };
    }
};

export const createService = async (serviceData) => {
    try {
      const response = await apiClient.post("/services", serviceData);
      return response.data;
    } catch (e) {
      return { error: true, e };
    }
};

export const deleteService = async (serviceId) => {
    try {
      const response = await apiClient.delete(`/services/${serviceId}`);
      return response.data;
    } catch (e) {
      return { error: true, e };
    }
};

export const updateService = async (serviceId, serviceData) => {
  try {
    const response = await apiClient.put(`/services/${serviceId}`, serviceData);
    
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    
    throw new Error(response.data?.message || 'Error al actualizar el servicio');
    
  } catch (e) {
    console.error('Error updating service:', e);
    return { 
      error: true,
      message: e.response?.data?.message || e.message || 'Error al actualizar el servicio'
    };
  }
};