import {
  Box,
  Grid,
  HStack,
  Heading,
  Button,
  Badge,
  VStack,
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import { FiEdit, FiImage } from "react-icons/fi";
import HotelForm from "../../hotels/HotelForm";
import HotelGallery from "../platform/HotelGallery";
import useHotel from "../../../shared/hooks/useHotel";
import { useEffect, useState } from "react";

const DashboardContent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isGalleryOpen, onOpen: onGalleryOpen, onClose: onGalleryClose } = useDisclosure();
  const { getHotelsByAdmin, updateHotel } = useHotel();
  const [hotelData, setHotelData] = useState({});
  const toast = useToast();

  const fetchHotelData = async () => {
    try {
      const data = await getHotelsByAdmin();
      setHotelData(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo cargar la información del hotel",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchHotelData();
  }, []);

  const handleEditSuccess = async (formData) => {
    try {
      await updateHotel(hotelData._id, formData);
      await fetchHotelData();
      onClose();
      toast({
        title: "Éxito",
        description: "Hotel actualizado correctamente",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el hotel",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={6}>
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" mb={6}>
        <Flex justify="space-between" align="center" mb={4}>
          <VStack align="start" spacing={1}>
            <Heading size="lg">{hotelData?.name}</Heading>
            <Text color="gray.600">{hotelData?.direction}</Text>
            <Badge colorScheme="blue">{hotelData?.category}</Badge>
          </VStack>
          <HStack spacing={2}>
            <IconButton
              icon={<FiImage />}
              colorScheme="blue"
              onClick={onGalleryOpen}
              aria-label="Ver galería"
            />
            <Button leftIcon={<FiEdit />} colorScheme="blue" onClick={onOpen}>
              Editar Hotel
            </Button>
          </HStack>
        </Flex>
        
        <Grid templateColumns="repeat(3, 1fr)" gap={4} mb={4}>
          <Box p={3} borderWidth="1px" borderRadius="md">
            <Text fontWeight="bold">Rango de Precios</Text>
            <Text>
              ${hotelData?.rangeOfPrices?.min || 0} - ${hotelData?.rangeOfPrices?.max || 0}
            </Text>
          </Box>
          <Box p={3} borderWidth="1px" borderRadius="md">
            <Text fontWeight="bold">Habitaciones Disponibles</Text>
            <Text>{hotelData?.availableRooms || 0}</Text>
          </Box>
          <Box p={3} borderWidth="1px" borderRadius="md">
            <Text fontWeight="bold">Habitaciones Ocupadas</Text>
            <Text>{hotelData?.busyRooms || 0}</Text>
          </Box>
        </Grid>

        <Box>
          <Text fontWeight="bold" mb={2}>Facilidades:</Text>
          <HStack spacing={2} wrap="wrap">
            {hotelData?.facilities?.map((facility, index) => (
              <Badge key={index} colorScheme="blue">
                {facility}
              </Badge>
            ))}
          </HStack>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent maxW="800px" my="auto">
          <ModalHeader>Editar Hotel</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <HotelForm hotelData={hotelData} onSuccess={handleEditSuccess} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isGalleryOpen} onClose={onGalleryClose} size="6xl">
        <ModalOverlay />
        <ModalContent maxW="1200px" my="auto">
          <ModalHeader>Galería de Imágenes - {hotelData?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <HotelGallery images={hotelData?.images || []} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DashboardContent; 