import { useState } from "react";
import { getHotelByManager, getRoomsByHotel, createRoom, updateRoom, toggleRoomState } from "../../services/api";
import { useToast } from "@chakra-ui/react";
import useAuthStore from "../../shared/stores/authStore";

const useRooms = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();

  const getRooms = async () => {
    setLoading(true);
    try {
      const hotelResponse = await getHotelByManager(user.id);
      if (hotelResponse.error) {
        toast({
          title: "Error",
          description: hotelResponse.e.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return [];
      }

      const roomsResponse = await getRoomsByHotel(hotelResponse.hotel.uid);
      console.log(roomsResponse)
      if (roomsResponse.error) {
        toast({
          title: "Error",
          description: roomsResponse.e.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return [];
      }

      setLoading(false);
      return roomsResponse.rooms;
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al obtener las habitaciones",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      return [];
    }
  };

  const createNewRoom = async (formData) => {
    setLoading(true);
    const response = await createRoom(formData);
    if (response.error) {
      toast({
        title: "Error",
        description: response.e.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Habitación creada",
        description: "La habitación se ha creado correctamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    setLoading(false);
    return response;
  };

  const editRoom = async (id, formData) => {
    setLoading(true);
    const response = await updateRoom(id, formData);
    if (response.error) {
      toast({
        title: "Error",
        description: response.e.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Habitación editada",
        description: "La habitación se ha editado correctamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    setLoading(false);
    return response;
  };

  const toggleRoom = async (id,available) => {
    setLoading(true);
    const response = await toggleRoomState(id, available);
    if (response.error) {
      toast({
        title: "Error",
        description: response.e.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Estado actualizado",
        description: "El estado de la habitación se ha actualizado correctamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    setLoading(false);
    return response;
  };

  return {
    loading,
    getRooms,
    createNewRoom,
    editRoom,
    toggleRoom
  };
};

export default useRooms;