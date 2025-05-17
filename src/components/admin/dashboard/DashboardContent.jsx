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
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import HotelForm from "../../hotels/HotelForm";

const DashboardContent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const hotelData = {
    name: "Ceferino's Ejecutive Club",
    direction: "6A Avenida 13-54, Cdad. de Guatemala",
    category: "1 Estrella",
    facilities: [
      "Wifi",
      "Piscina",
      "Access to private escorts room",
      "Premium escorts unlimited"
    ],
    rangeOfPrices: {
      min: 500,
      max: 3000
    },
    availableRooms: 2,
    busyRooms: 0
  };

  const handleEditSuccess = () => {
    onClose();
  };

  return (
    <Box p={6}>
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" mb={6}>
        <Flex justify="space-between" align="center" mb={4}>
          <VStack align="start" spacing={1}>
            <Heading size="lg">{hotelData.name}</Heading>
            <Text color="gray.600">{hotelData.direction}</Text>
            <Badge colorScheme="blue">{hotelData.category}</Badge>
          </VStack>
          <Button leftIcon={<FiEdit />} colorScheme="blue" onClick={onOpen}>
            Editar Hotel
          </Button>
        </Flex>
        
        <Grid templateColumns="repeat(3, 1fr)" gap={4} mb={4}>
          <Box p={3} borderWidth="1px" borderRadius="md">
            <Text fontWeight="bold">Rango de Precios</Text>
            <Text>${hotelData.rangeOfPrices.min} - ${hotelData.rangeOfPrices.max}</Text>
          </Box>
          <Box p={3} borderWidth="1px" borderRadius="md">
            <Text fontWeight="bold">Habitaciones Disponibles</Text>
            <Text>{hotelData.availableRooms}</Text>
          </Box>
          <Box p={3} borderWidth="1px" borderRadius="md">
            <Text fontWeight="bold">Habitaciones Ocupadas</Text>
            <Text>{hotelData.busyRooms}</Text>
          </Box>
        </Grid>

        <Box>
          <Text fontWeight="bold" mb={2}>Facilidades:</Text>
          <HStack spacing={2} wrap="wrap">
            {hotelData.facilities.map((facility, index) => (
              <Badge key={index} colorScheme="green" p={2}>
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
    </Box>
  );
};

export default DashboardContent; 