import { useState } from "react";
import { getManagers as getManagersRequest } from "../../services/api";
import { useToast } from "@chakra-ui/react";
const useUsers = () => {
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const getManagers = async () => {
        setIsLoading(true);
        const response = await getManagersRequest();
        if(response.error) {
            toast({
                title: "Error",
                description: response.e.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
        setIsLoading(false);
        return response.managers;
    }

    return {
        getManagers,
        isLoading,
    }
}

export default useUsers;


