import { useState } from "react";
import { register as registerRequest } from "../../services/api.js";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const registerUser = async (data) => {
    setIsLoading(true);

    const response = await registerRequest(data);
    setIsLoading(false);
    console.log(response)
    if (response.error) {
      toast({
        title: "Registration failed",
        description:
          response.e.response?.data.msg ||
          "An error occurred during registration.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: "Registration successful",
      description: "You have registered successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/login");
  };

  return {
    registerUser,
    isLoading,
  };
};