import { useState } from "react";
import {createEvent as createEventRequest, getMyEvents as getMyEventsRequest, getEvents as getEventsRequest, editEvent as editEventRequest, cancelEvent as cancelEventRequest} from "../../services/api";
import { useToast } from "@chakra-ui/react";

export const useEvent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const createEvent = async (data, hotelId) => {
        setIsLoading(true);
        try {
            const response = await createEventRequest(data, hotelId);
            if(response.error) {
                toast({
                    title: "Error",
                    description: response.e.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                return null;
            }
            toast({
                title: "Éxito",
                description: "Evento creado correctamente",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            return response;
        } catch (error) {
            toast({
                title: "Error",
                description: "Error al crear el evento",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return null;
        } finally {
            setIsLoading(false);
        }
    }

    const getMyEvents = async () => {
        setIsLoading(true);
        const response = await getMyEventsRequest();
        if(response.error) {
            toast({
                title: "Error",
                description: response.e.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            setIsLoading(false);
            return;
        }
        setIsLoading(false);
        return response.events;
    }

    const getEvents = async () => {
        setIsLoading(true);
        const response = await getEventsRequest();
        if(response.error) {
            toast({
                title: "Error", 
                description: response.e.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            setIsLoading(false);
            return;
        }
        setIsLoading(false);
        return response;
    }
    
    const editEvent = async (id, data) => {
        setIsLoading(true);
        console.log(data)
        const response = await editEventRequest(id, data);
        if(response.error) {
            toast({
                title: "Error",
                description: response.e.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            setIsLoading(false);
            return;
        }
        toast({
            title: "Success",
            description: "Evento editado correctamente",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
        setIsLoading(false);
        return response;
    }

    const cancelEvent = async (id) => {
        setIsLoading(true);
        const response = await cancelEventRequest(id);
        if(response.error) {
            toast({
                title: "Error",
                description: response.e.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            setIsLoading(false);
            return;
        }
        toast({
            title: "Success",
            description: "Evento cancelado correctamente",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
        setIsLoading(false);
        return response;
    }

    return {
        isLoading,
        createEvent,
        getMyEvents,
        getEvents,
        editEvent,
        cancelEvent,
    }
}

