import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import useAuthStore from "../../shared/stores/authStore";

const useRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("Todas");
  const [typeFilter, setTypeFilter] = useState("Todos los Tipos");
  const [stateFilter, setStateFilter] = useState("Todas");
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toast = useToast();
  const token = useAuthStore((state) => state.getToken());

  // Memoize filterRooms using useCallback, and make sure its dependencies are stable.
  // It should depend only on the filtering criteria, not on 'rooms' itself.
  // The 'currentRooms' parameter allows us to pass the latest 'rooms' array directly when needed.
  const applyFilters = useCallback(
    (currentRooms, search, availability, type, roomState) => {
      let tempFiltered = currentRooms;

      if (roomState === "Activas") {
        tempFiltered = tempFiltered.filter((room) => room.state === true);
      } else if (roomState === "Inactivas") {
        tempFiltered = tempFiltered.filter((room) => room.state === false);
      }

      if (search) {
        tempFiltered = tempFiltered.filter(
          (room) =>
            room.type.toLowerCase().includes(search.toLowerCase()) ||
            room.uid.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (availability !== "Todas") {
        tempFiltered = tempFiltered.filter((room) => {
          if (availability === "Activadas") return room.available;
          if (availability === "Desactivadas") return !room.available;
          return true;
        });
      }

      if (type !== "Todos los Tipos") {
        tempFiltered = tempFiltered.filter((room) => room.type === type);
      }

      setFilteredRooms(tempFiltered);
    },
    [] // Dependencies are empty because it operates on the 'currentRooms' parameter
  );

  // This effect runs only once on mount and when token changes, fetching initial data.
  // Subsequent re-fetches are triggered by the refresh button.
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!token) throw new Error("Token no encontrado. Inicia sesión.");

        const hotelRes = await axios.get(
          "http://localhost:3000/hotelManager/v1/hotels/hotel-by-manager",
          {
            headers: { "x-token": token },
          }
        );

        const hotelData = hotelRes.data.hotel;
        setHotel(hotelData);

        const roomsRes = await axios.get(
          `http://localhost:3000/hotelManager/v1/hotels/${hotelData.uid}/rooms`,
          {
            headers: { "x-token": token },
          }
        );

        const fetchedRooms = roomsRes.data.rooms || [];
        setRooms(fetchedRooms);
        // Apply filters immediately after fetching the initial data
        applyFilters(
          fetchedRooms,
          searchTerm,
          availabilityFilter,
          typeFilter,
          stateFilter
        );
      } catch (err) {
        const msg =
          err.response?.status === 401
            ? "Token inválido o expirado. Por favor, vuelve a iniciar sesión."
            : err.message || "Error al conectar con el servidor.";
        setError(msg);
        toast({
          title: "Error de Carga",
          description: msg,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [token, toast]); // Only re-run when token changes

  // This effect handles filtering whenever rooms or filter criteria change
  useEffect(() => {
    applyFilters(rooms, searchTerm, availabilityFilter, typeFilter, stateFilter);
  }, [rooms, searchTerm, availabilityFilter, typeFilter, stateFilter, applyFilters]);


  const handleAddRoom = async (roomData) => {
    // ... (rest of the handleAddRoom function remains the same)
    if (!hotel || !token) {
        toast({
          title: "Error",
          description: "No se pudo obtener la información del hotel o el token.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return false;
      }

      const newRoomData = {
        ...roomData,
        hotel_id: hotel.uid,
      };

      try {
        const response = await axios.post(
          "http://localhost:3000/hotelManager/v1/rooms",
          newRoomData,
          {
            headers: { "x-token": token },
          }
        );

        const addedRoom = response.data.room;
        const updatedRooms = [...rooms, addedRoom];
        setRooms(updatedRooms); // This will trigger the filtering useEffect
        toast({
          title: "Habitación agregada",
          description: "Registro exitoso.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        return true;
      } catch (err) {
        toast({
          title: "Error al agregar",
          description:
            err.response?.data?.msg ||
            err.message ||
            "Error al agregar la habitación.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return false;
      }
  };

  const handleEditRoom = async (uid, roomData) => {
    // ... (rest of the handleEditRoom function remains the same)
    if (!hotel || !token) {
        toast({
          title: "Error",
          description: "No se pudo obtener la información necesaria para editar.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return false;
      }

      try {
        const response = await axios.put(
          `http://localhost:3000/hotelManager/v1/rooms/${uid}`,
          roomData,
          {
            headers: { "x-token": token },
          }
        );

        const updatedRoom = response.data.room;
        const updatedRooms = rooms.map((r) =>
          r.uid === updatedRoom.uid ? updatedRoom : r
        );
        setRooms(updatedRooms); // This will trigger the filtering useEffect
        toast({
          title: "Habitación actualizada",
          description: "Actualización exitosa.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        return true;
      } catch (err) {
        toast({
          title: "Error al actualizar",
          description:
            err.response?.data?.msg ||
            err.message ||
            "Error al actualizar la habitación.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return false;
      }
  };

  const handleToggleRoomState = async (uid) => {
    // ... (rest of the handleToggleRoomState function remains the same)
    if (!token) return;
    const room = rooms.find((r) => r.uid === uid);
    if (!room) return;

    const updatedState = !room.state;
    const roomStateUpdate = { state: updatedState };

    try {
      await axios.patch(
        `http://localhost:3000/hotelManager/v1/rooms/${uid}`,
        roomStateUpdate,
        {
          headers: { "x-token": token },
        }
      );

      const updatedRooms = rooms.map((r) =>
        r.uid === uid ? { ...r, state: updatedState } : r
      );
      setRooms(updatedRooms); // This will trigger the filtering useEffect
      toast({
        title: updatedState ? "Habitación Activada" : "Habitación Desactivada",
        description: `La habitación fue ${
          updatedState ? "activada" : "desactivada"
        }.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      return true;
    } catch (err) {
      toast({
        title: "Error al cambiar estado",
        description:
          err.response?.data?.msg ||
          err.message ||
          "Error al cambiar el estado de la habitación.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
  };

  const handleDeleteRoom = async (uid) => {
    // ... (rest of the handleDeleteRoom function remains the same)
    if (!token) return;
    try {
      await axios.delete(`http://localhost:3000/hotelManager/v1/rooms/${uid}`, {
        headers: { "x-token": token },
      });
      const updatedRooms = rooms.filter((room) => room.uid !== uid);
      setRooms(updatedRooms); // This will trigger the filtering useEffect
      toast({
        title: "Habitación eliminada",
        description: "La habitación ha sido eliminada exitosamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      return true;
    } catch (err) {
      toast({
        title: "Error al eliminar",
        description:
          err.response?.data?.msg ||
          err.message ||
          "Error al eliminar la habitación.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    // Setting the state here will trigger the useEffect that handles filtering
  };

  const handleAvailabilityFilter = (availability) => {
    setAvailabilityFilter(availability);
    // Setting the state here will trigger the useEffect that handles filtering
  };

  const handleTypeFilter = (type) => {
    setTypeFilter(type);
    // Setting the state here will trigger the useEffect that handles filtering
  };

  const handleStateFilter = (roomState) => {
    setStateFilter(roomState);
    // Setting the state here will trigger the useEffect that handles filtering
  };

  return {
    rooms, // Still expose 'rooms' for cases like getting a specific room's state
    filteredRooms,
    searchTerm,
    availabilityFilter,
    typeFilter,
    stateFilter,
    hotel,
    loading,
    error,
    // Expose fetchHotelAndRooms so the UI can explicitly trigger a refresh
    fetchHotelAndRooms: () => {
      // Re-fetch rooms by clearing error and re-running the initial fetch logic
      setError(null);
      setLoading(true);
      // Directly call the initial fetch function, or wrap it if needed for dependencies
      const fetchRoomsAgain = async () => {
        try {
            if (!token) throw new Error("Token no encontrado.");
            const hotelRes = await axios.get(
              "http://localhost:3000/hotelManager/v1/hotels/hotel-by-manager",
              { headers: { "x-token": token } }
            );
            const hotelData = hotelRes.data.hotel;
            setHotel(hotelData);
            const roomsRes = await axios.get(
              `http://localhost:3000/hotelManager/v1/hotels/${hotelData.uid}/rooms`,
              { headers: { "x-token": token } }
            );
            const fetchedRooms = roomsRes.data.rooms || [];
            setRooms(fetchedRooms);
            applyFilters(fetchedRooms, searchTerm, availabilityFilter, typeFilter, stateFilter);
        } catch (err) {
            const msg =
                err.response?.status === 401
                    ? "Token inválido o expirado."
                    : err.message || "Error al conectar con el servidor.";
            setError(msg);
            toast({
                title: "Error al recargar",
                description: msg,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
      };
      fetchRoomsAgain();
    },
    handleAddRoom,
    handleEditRoom,
    handleToggleRoomState,
    handleDeleteRoom,
    handleSearch,
    handleAvailabilityFilter,
    handleTypeFilter,
    handleStateFilter,
  };
};

export default useRooms;