import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import useAuthStore from "../stores/authStore";

const useHotelEvents = () => {
  const [events, setEvents] = useState([]);
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hotelId, setHotelId] = useState(null);
  const [eventDetails, setEventDetails] = useState(null);

  const toast = useToast();
  const token = useAuthStore((state) => state.getToken());

  const getHeaders = () => {
    if (!token) return {};
    return { "x-token": token };
  };

  const fetchHotel = useCallback(async () => {
    if (!token) return null;
    try {
      const response = await axios.get(
        "http://localhost:3000/hotelManager/v1/hotels/hotel-by-manager",
        { headers: getHeaders() }
      );
      const h = response.data.hotel;
      setHotel(h);
      setHotelId(h.uid || h._id);
      return h;
    } catch (err) {
      console.error("❌ Error al obtener el hotel:", err.message);
      return null;
    }
  }, [token]);

  const fetchEvents = useCallback(async (hotelIdToUse) => {
    if (!hotelIdToUse) {
      setEvents([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/hotelManager/v1/events/hotels/${hotelIdToUse}/events`
      );
      setEvents(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (err) {
      const msg = err.response?.data?.msg || err.message;
      setError(msg);
      toast({
        title: "Error al cargar eventos",
        description: msg,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      setError(null);

      let currentHotel = null;
      if (token) {
        currentHotel = await fetchHotel();
      }

      const idToUse = currentHotel?.uid || currentHotel?._id || hotelId;

      if (!idToUse) {
        console.warn("⚠️ No se encontró hotelId para eventos.");
        setLoading(false);
        return;
      }

      await fetchEvents(idToUse);
    };

    initialize();
  }, [fetchHotel, fetchEvents, token]);

  const createEvent = async (eventData) => {
    if (!hotelId) {
      toast({
        title: "Error",
        description: "No hay hotel seleccionado para crear eventos.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    try {
      await axios.post(
        `http://localhost:3000/hotelManager/v1/events/hotels/${hotelId}/events`,
        eventData,
        { headers: getHeaders() }
      );
      toast({
        title: "Evento creado",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      await fetchEvents(hotelId);
      return true;
    } catch (err) {
      const msg = err.response?.data?.msg || err.message;
      toast({
        title: "Error al crear evento",
        description: msg,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return false;
    }
  };

  const updateEvent = async (eventId, eventData) => {
    if (!eventId) return false;

    try {
      await axios.put(
        `http://localhost:3000/hotelManager/v1/events/${eventId}`,
        eventData,
        { headers: getHeaders() }
      );
      toast({
        title: "Evento actualizado",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      if (hotelId) await fetchEvents(hotelId);
      return true;
    } catch (err) {
      const msg = err.response?.data?.msg || err.message;
      toast({
        title: "Error al actualizar evento",
        description: msg,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return false;
    }
  };

  const deleteEvent = async (eventId) => {
    if (!eventId) return false;

    try {
      await axios.delete(
        `http://localhost:3000/hotelManager/v1/events/${eventId}`,
        { headers: getHeaders() }
      );
      toast({
        title: "Evento eliminado",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      if (hotelId) await fetchEvents(hotelId);
      return true;
    } catch (err) {
      const msg = err.response?.data?.msg || err.message;
      toast({
        title: "Error al eliminar evento",
        description: msg,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return false;
    }
  };

  const getEventDetails = async (eventId) => {
    if (!eventId) return null;

    try {
      const response = await axios.get(
        `http://localhost:3000/hotelManager/v1/events/${eventId}`,
        { headers: getHeaders() }
      );
      setEventDetails(response.data);
      return response.data;
    } catch (err) {
      const msg = err.response?.data?.msg || err.message;
      toast({
        title: "Error al obtener detalles del evento",
        description: msg,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return null;
    }
  };

  return {
    events,
    hotel,
    hotelId,
    loading,
    error,
    eventDetails,       
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,       
    getEventDetails,    
  };
};

export default useHotelEvents;
