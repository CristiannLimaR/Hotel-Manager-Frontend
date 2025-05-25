import { useState } from "react";
import { getManagers as getManagersRequest, getUsers as getUsersRequest, updateUser as updateUserRequest, deleteUser as deleteUserRequest } from "../../services/api";
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

    const getUsers = async () => {
        setIsLoading(true);
        const response = await getUsersRequest();
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
        return response.users;
    }

    const updateUser = async (id, data) => {
        setIsLoading(true);
        const response = await updateUserRequest(id, data);
        if(response.error) {
            toast({
                title: "Error",
                description: response.e.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
        toast({
            title: "Success",
            description: "User updated successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
        })
        setIsLoading(false);
        return response.user;
    }

    const deleteUser = async (id) => {
        setIsLoading(true);
        const response = await deleteUserRequest(id);
        if(response.error) {
            toast({
                title: "Error",
                description: response.e.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
        toast({
            title: "Success",
            description: "User deleted successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
        })
        setIsLoading(false);
        return response.user;
    }

    
    
    return {
        getManagers,
        getUsers,
        deleteUser,
        updateUser,
        isLoading,
    }
}

export default useUsers;


