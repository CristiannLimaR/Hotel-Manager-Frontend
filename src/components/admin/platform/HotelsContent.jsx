import { useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Select,
  Button,
  Flex,
  Badge,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Card,
  IconButton,
} from "@chakra-ui/react";
import { FiImage } from "react-icons/fi";
import HotelForm from "../../hotels/HotelForm";
import HotelGallery from "./HotelGallery";

const HotelsContent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isGalleryOpen, onOpen: onGalleryOpen, onClose: onGalleryClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedHotel, setSelectedHotel] = useState(null);

  // Datos de ejemplo
  const hotels = [
    {
      id: 1,
      name: "Hotel Marina",
      location: "Barcelona",
      rooms: 120,
      status: "activo",
      admin: "Juan Pérez",
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        "https://images.unsplash.com/photo-1582719508461-905c673771fd",
      ],
    },
    {
      id: 2,
      name: "Hotel Central",
      location: "Madrid",
      rooms: 85,
      status: "pendiente",
      admin: "María García",
      images: [
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
      ],
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "activo":
        return "green";
      case "pendiente":
        return "yellow";
      case "inactivo":
        return "red";
      default:
        return "gray";
    }
  };

  const handleHotelSuccess = () => {
    onClose();
   
  };

  const handleViewGallery = (hotel) => {
    setSelectedHotel(hotel);
    onGalleryOpen();
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading>Gestión de Hoteles</Heading>
        <Button colorScheme="blue" onClick={onOpen}>
          Nuevo Hotel
        </Button>
      </Flex>

      <Card>
        <Flex gap={4} mb={4}>
          <Input
            placeholder="Buscar hoteles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            maxW="300px"
          />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            maxW="200px"
          >
            <option value="all">Todos los estados</option>
            <option value="activo">Activo</option>
            <option value="pendiente">Pendiente</option>
            <option value="inactivo">Inactivo</option>
          </Select>
        </Flex>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nombre</Th>
              <Th>Ubicación</Th>
              <Th>Habitaciones</Th>
              <Th>Estado</Th>
              <Th>Admin</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {hotels.map((hotel) => (
              <Tr key={hotel.id}>
                <Td>{hotel.id}</Td>
                <Td>{hotel.name}</Td>
                <Td>{hotel.location}</Td>
                <Td>{hotel.rooms}</Td>
                <Td>
                  <Badge colorScheme={getStatusColor(hotel.status)}>
                    {hotel.status}
                  </Badge>
                </Td>
                <Td>{hotel.admin}</Td>
                <Td>
                  <IconButton
                    icon={<FiImage />}
                    size="sm"
                    colorScheme="blue"
                    mr={2}
                    onClick={() => handleViewGallery(hotel)}
                    aria-label="Ver galería"
                  />
                  <Button size="sm" colorScheme="blue" mr={2}>
                    Editar
                  </Button>
                  <Button size="sm" colorScheme="green" mr={2}>
                    Verificar
                  </Button>
                  <Button size="sm" colorScheme="red">
                    Eliminar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Card>

      {/* Modal para nuevo hotel */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent maxW="800px" my="auto">
          <ModalHeader>Nuevo Hotel</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <HotelForm onSuccess={handleHotelSuccess} />
          </ModalBody>
        </ModalContent>
      </Modal>

      
      <Modal isOpen={isGalleryOpen} onClose={onGalleryClose} size="6xl">
        <ModalOverlay />
        <ModalContent maxW="1200px" my="auto">
          <ModalHeader>Galería de Imágenes - {selectedHotel?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <HotelGallery images={selectedHotel?.images || []} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default HotelsContent; 