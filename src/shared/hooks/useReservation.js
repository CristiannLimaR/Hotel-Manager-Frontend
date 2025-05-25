import { useState } from "react";
import { saveReservation as saveReservationRequest, getReservations as getReservationsRequest, getReservationsByUser as getReservationsByUserRequest, editReservation as editReservationRequest, deleteReservation as deleteReservationRequest } from "../../services/api";
import { useToast } from "@chakra-ui/react";
export const useReservation = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const saveReservation = async (data) => {
    setLoading(true);
    const response = await saveReservationRequest(data);
    if (response.error) {
      toast({
        title: "Error",
        description: response.e.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    toast({
      title: "Reserva creada",
      description: "La reserva se ha creado correctamente",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setLoading(false);
    return response;
  };
  const getReservations = async () => {
    setLoading(true);
    const response = await getReservationsRequest();
    if (response.error) {
      toast({
        title: "Error",
        description: response.e.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    
    setLoading(false);
    return response.reservations;
  };
  const getReservationsByUser = async () => {
    setLoading(true);
    const response = await getReservationsByUserRequest();
    if (response.error) {
      toast({
        title: "Error",
        description: response.e.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setLoading(false);
    return response.reservations;
  };

  const editReservation = async (id, data) => {
    setLoading(true);
    const response = await editReservationRequest(id, data);
    if (response.error) {
      console.log(response)
      toast({
        title: "Error",
        description: response.e.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    toast({
      title: "Reserva editada",
      description: "La reserva se ha editado correctamente",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setLoading(false);
    return response;
  };

  const deleteReservation = async (id) => {
    setLoading(true);
    const response = await deleteReservationRequest(id);
    if (response.error) {
      toast({
        title: "Error",
        description: response.e.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    toast({
      title: "Reserva eliminada",
      description: "La reserva se ha eliminado correctamente",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setLoading(false);
    return response;
  };
  return { saveReservation, loading, getReservations, getReservationsByUser, editReservation, deleteReservation };
};
