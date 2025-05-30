import { useState } from "react";
import { getInvoices as getInvoicesRequest, createInvoice as createInvoiceRequest } from "../../services/api.js";
import { useToast } from "@chakra-ui/react";

export const useInvoices = () => {
    const [isLoading, setIsLoading] = useState([]);
    const toast = useToast();

    const getInvoices = async (hotelId) => {
        setIsLoading(true);
        const response = await getInvoicesRequest(hotelId);
        if (response.error) {
            toast({
                title: "Error",
                description: response.e.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
        setIsLoading(false);
        return response.invoices;
    };

    const createInvoice = async (data) => {
        setIsLoading(true);
        const response = await createInvoiceRequest(data);
        if (response.error) {
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
            description: "Reservacion completada correctamente, puedes ver la factura en la seccion de facturas",
            status: "success",
            duration: 3000,
            isClosable: true,
        })
        setIsLoading(false);
        return response
    };

    return { getInvoices, createInvoice, isLoading };
};