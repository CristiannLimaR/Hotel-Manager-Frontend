import { useState} from "react";
import { getHotels as getHotelsRequest, saveHotel as saveHotelRequest, updateHotel as updateHotelRequest, deleteHotel as deleteHotelRequest, getHotelsByAdmin as getHotelsByAdminRequest } from "../../services/api";
import { useToast } from "@chakra-ui/react";
const useHotel = () => {
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const getHotels = async () => {
        setIsLoading(true);
        const response = await getHotelsRequest();
        console.log(response);
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
        console.log(response.hotels);
        return response.hotels;
    };

    const getHotelsByAdmin = async () => {
        setIsLoading(true);
        const response = await getHotelsByAdminRequest();
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
        
        return response.hotel;
    };

    const saveHotel = async (data) => {
        setIsLoading(true);

        const response = await saveHotelRequest(data);
        
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
            title: "Hotel creado",
            description: "Hotel creado correctamente",
            status: "success",
            duration: 3000,
            isClosable: true,
        });

        setIsLoading(false);
    }
    const editHotel = async (id, data) => {
        setIsLoading(true);
        const response = await updateHotelRequest(id, data);
        
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
            title: "Hotel actualizado",
            description: "Hotel actualizado correctamente",
            status: "success",
            duration: 3000,
            isClosable: true,
        });

        setIsLoading(false);
    }
    const deleteHotel = async (id) => { 
        setIsLoading(true);
        const response = await deleteHotelRequest(id);
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
            title: "Hotel eliminado",
            description: "Hotel eliminado correctamente",
            status: "success",
            duration: 3000,
            isClosable: true,
        }); 

        setIsLoading(false);
    }
        
    return {
        getHotels,
        getHotelsByAdmin,
        saveHotel,
        editHotel,
        deleteHotel,
        isLoading,
    }
}

export default useHotel;
