import { useState } from "react";
import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Grid,
  Badge,
  VStack,
  Text,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Heading,
  Divider,
  GridItem,
} from "@chakra-ui/react";
import {
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiEdit,
  FiTrash2,
  FiPlus,
} from "react-icons/fi";

const RoomsContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState([
    {
      type: "Deluxe",
      capacity: 2,
      price_per_night: 150.99,
      hotel_id: "681aca0b6c38a92a345e2970",
      available: true,
      state: true,
      nonAvailability: [],
      createdAt: "2025-05-15T15:24:27.486Z",
      updatedAt: "2025-05-15T15:24:27.486Z",
      uid: "6826072b257515c523f67441"
    }
  ]);
  const [filteredRooms, setFilteredRooms] = useState(rooms);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todas");
  const [typeFilter, setTypeFilter] = useState("Todos los Tipos");

  const handleViewDetails = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    filterRooms(value, statusFilter, typeFilter);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    filterRooms(searchTerm, status, typeFilter);
  };

  const handleTypeFilter = (type) => {
    setTypeFilter(type);
    filterRooms(searchTerm, statusFilter, type);
  };

  const filterRooms = (search, status, type) => {
    let filtered = rooms;

    if (search) {
      filtered = filtered.filter(room => 
        room.type.toLowerCase().includes(search.toLowerCase()) ||
        room.uid.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== "Todas") {
      filtered = filtered.filter(room => {
        if (status === "Disponibles") return room.available;
        if (status === "No Disponibles") return !room.available;
        return true;
      });
    }

    if (type !== "Todos los Tipos") {
      filtered = filtered.filter(room => room.type === type);
    }

    setFilteredRooms(filtered);
  };

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <HStack>
          <InputGroup w="300px">
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="gray.400" />
            </InputLeftElement>
            <Input 
              placeholder="Buscar habitaciones..." 
              borderRadius="md"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </InputGroup>
          <Menu>
            <MenuButton as={Button} rightIcon={<FiFilter />} variant="outline">
              Estado: {statusFilter}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleStatusFilter("Todas")}>Todas</MenuItem>
              <MenuItem onClick={() => handleStatusFilter("Disponibles")}>Disponibles</MenuItem>
              <MenuItem onClick={() => handleStatusFilter("No Disponibles")}>No Disponibles</MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<FiFilter />} variant="outline">
              Tipo: {typeFilter}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleTypeFilter("Todos los Tipos")}>Todos los Tipos</MenuItem>
              <MenuItem onClick={() => handleTypeFilter("Deluxe")}>Deluxe</MenuItem>
              <MenuItem onClick={() => handleTypeFilter("Suite")}>Suite</MenuItem>
              <MenuItem onClick={() => handleTypeFilter("Estándar")}>Estándar</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        <Button colorScheme="blue" leftIcon={<FiRefreshCw />}>
          Actualizar Estado
        </Button>
        <Button colorScheme="blue" leftIcon={<FiPlus />}>
          Crear Habitación
        </Button>
      </HStack>

      <Grid templateColumns="repeat(4, 1fr)" gap={4}>
        {filteredRooms.map((room) => (
          <Box 
            key={room.uid}
            borderWidth="1px" 
            borderRadius="lg" 
            overflow="hidden"
            borderColor="blue.200"
            bg="white"
          >
            <Box p="4">
              <HStack justify="space-between" mb={2}>
                <Heading size="md">Habitación {room.type}</Heading>
                <Badge colorScheme={room.available ? "green" : "red"}>
                  {room.available ? "Disponible" : "No Disponible"}
                </Badge>
              </HStack>
              <Text fontSize="sm" color="gray.500">ID: {room.uid}</Text>
              <Divider my={2} />
              <VStack align="start" spacing={2}>
                <HStack justify="space-between" w="full">
                  <Text fontSize="sm">Capacidad:</Text>
                  <Text fontSize="sm" fontWeight="bold">{room.capacity} personas</Text>
                </HStack>
                <HStack justify="space-between" w="full">
                  <Text fontSize="sm">Precio por noche:</Text>
                  <Text fontSize="sm" fontWeight="bold">${room.price_per_night}</Text>
                </HStack>
                <HStack justify="space-between" w="full">
                  <Text fontSize="sm">Estado:</Text>
                  <Badge colorScheme={room.state ? "green" : "red"}>
                    {room.state ? "Activa" : "Inactiva"}
                  </Badge>
                </HStack>
                <HStack justify="space-between" w="full">
                  <Text fontSize="sm">Creada:</Text>
                  <Text fontSize="sm">{new Date(room.createdAt).toLocaleDateString()}</Text>
                </HStack>
              </VStack>
              <HStack mt={4} spacing={2}>
                <Button 
                  size="sm" 
                  w="full" 
                  colorScheme="blue" 
                  variant="outline"
                  onClick={() => handleViewDetails(room)}
                >
                  Ver Detalles
                </Button>
                <IconButton 
                  aria-label="Editar habitación" 
                  icon={<FiEdit />} 
                  size="sm" 
                  colorScheme="yellow" 
                  variant="outline" 
                />
                <IconButton 
                  aria-label="Eliminar habitación" 
                  icon={<FiTrash2 />} 
                  size="sm" 
                  colorScheme="red" 
                  variant="outline" 
                />
              </HStack>
            </Box>
          </Box>
        ))}
      </Grid>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalles de la Habitación</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedRoom && (
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <GridItem>
                  <VStack align="start" spacing={4}>
                    <Box>
                      <Text fontWeight="bold">Información General</Text>
                      <Text>Tipo: {selectedRoom.type}</Text>
                      <Text>ID: {selectedRoom.uid}</Text>
                      <Text>Hotel ID: {selectedRoom.hotel_id}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Capacidad y Precios</Text>
                      <Text>Capacidad: {selectedRoom.capacity} personas</Text>
                      <Text>Precio por noche: ${selectedRoom.price_per_night}</Text>
                    </Box>
                  </VStack>
                </GridItem>
                <GridItem>
                  <VStack align="start" spacing={4}>
                    <Box>
                      <Text fontWeight="bold">Estado</Text>
                      <HStack spacing={2}>
                        <Badge colorScheme={selectedRoom.available ? "green" : "red"}>
                          {selectedRoom.available ? "Disponible" : "No Disponible"}
                        </Badge>
                        <Badge colorScheme={selectedRoom.state ? "green" : "red"}>
                          {selectedRoom.state ? "Activa" : "Inactiva"}
                        </Badge>
                      </HStack>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Fechas</Text>
                      <Text>Creada: {new Date(selectedRoom.createdAt).toLocaleDateString()}</Text>
                      <Text>Última actualización: {new Date(selectedRoom.updatedAt).toLocaleDateString()}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Disponibilidad</Text>
                      <Text>Períodos no disponibles: {selectedRoom.nonAvailability.length}</Text>
                    </Box>
                  </VStack>
                </GridItem>
              </Grid>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => setIsModalOpen(false)}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default RoomsContent; 