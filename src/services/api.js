import axios from "axios";
import useAuthStore from '../shared/stores/authStore';

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:3000/hotelManager/v1",
  timeout: 5000,
});

// Interceptor para incluir el token en todas las peticiones
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

// =================== AUTENTICACIÓN ===================
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

export const register = async (data) => {
  try {
    return await apiClient.post("/auth/register", data);
  } catch (e) {
    return { error: true, e };
  }
};

// =================== HOTELES ===================
export const getHotels = async () => {
  try {
    const response = await apiClient.get("/hotels/get");
    return response.data;
  } catch (e) {
    return { error: true, e };
  }
};


export const getHotelsByManager = async () => {
  try {
    const response = await apiClient.get("/hotels/hotel-by-manager");
    return response.data;
  } catch (e) {
    return { error: true, e };
  }
};

// Si prefieres usar getHotelsByAdmin, puedes cambiar el nombre aquí y en la ruta
export const getHotelsByAdmin = async () => {
  try {
    const response = await apiClient.get("/hotels/hotel-by-manager");  // O ajusta la ruta según corresponda
    return response.data;
  } catch (e) {
    return { error: true, e };
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

// =================== USUARIOS ===================
export const getManagers = async () => {
  try {
    const response = await apiClient.get("/users/managers");
    return response.data;
  } catch (e) {
    return { error: true, e };
  }
};

// =================== HABITACIONES ===================
export const getRoomsByHotelId = async (hotelId) => {
  try {
    const response = await apiClient.get(`/hotels/${hotelId}/rooms`);
    return response.data;
  } catch (e) {
    return { error: true, e };
  }
};

export const getRoomById = async (id) => {
  try {
    const response = await apiClient.get(`/rooms/${id}`);
    return response.data;
  } catch (e) {
    return { error: true, e };
  }
};

export const saveRoom = async (data) => {
  try {
    const response = await apiClient.post(`/rooms`, data);
    return response.data;
  } catch (e) {
    return { error: true, e };
  }
};

export const updateRoom = async (id, data) => {
  try {
    const response = await apiClient.put(`/rooms/${id}`, data);
    return response.data;
  } catch (e) {
    return { error: true, e };
  }
};

export const disableRoom = async (id) => {
  try {
    const response = await apiClient.put(`/rooms/${id}`, { availability: false });
    return response.data;
  } catch (e) {
    return { error: true, e };
  }
};

export const deleteRoom = async (id) => {
  try {
    const response = await apiClient.delete(`/rooms/${id}`);
    return response.data;
  } catch (e) {
    return { error: true, e };
  }
};

// =================== EVENTOS ===================

// Crear evento para un hotel específico
export const createEvent = async (hotelId, eventData) => {
  try {
    const response = await apiClient.post(`/events/hotels/${hotelId}/events`, eventData);
    return response.data;
  } catch (e) {
    return { error: true, e };
  }
};

// Obtener todos los eventos de un hotel
export const getEventsByHotel = async (hotelId) => {
  try {
    const response = await apiClient.get(`/events/hotels/${hotelId}/events`);
    return response.data;
  } catch (e) {
    return { error: true, e };
  }
};

// Obtener detalles de un evento por su ID
export const getEventById = async (eventId) => {
  try {
    const response = await apiClient.get(`/events/${eventId}`);
    return response.data;
  } catch (e) {
    return { error: true, e };
  }
};

// Actualizar un evento por su ID
export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await apiClient.put(`/events/${eventId}`, eventData);
    return response.data;
  } catch (e) {
    return { error: true, e };
  }
};

// Eliminar un evento por su ID
export const deleteEvent = async (eventId) => {
  try {
    const response = await apiClient.delete(`/events/${eventId}`);
    return response.data;
  } catch (e) {
    return { error: true, e };
  }
};