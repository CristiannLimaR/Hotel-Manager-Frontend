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
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
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
  Grid,
  GridItem,
} from "@chakra-ui/react";
import {
  FiSearch,
  FiFilter,
  FiPlus,
  FiEye,
  FiEdit,
  FiCalendar,
  FiTrash2,
} from "react-icons/fi";

const ReservationsContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [reservations, setReservations] = useState([
    {
      _id: "681acd9c6c0cd25574a8b252",
      user: {
        _id: "681998288bf0c4096097c2d5",
        nombre: "Jorge",
        email: "pep@gmail.com",
        role: "ADMIN_ROLE",
        estado: true,
        createdAt: "2025-05-06T05:03:36.539Z"
      },
      room: {
        type: "Deluxe",
        capacity: 2,
        price_per_night: 150.99,
        availability: [],
        hotel_id: "681aca0b6c38a92a345e2970",
        available: true,
        state: true,
        createdAt: "2025-05-07T02:50:42.484Z",
        updatedAt: "2025-05-07T02:50:42.484Z",
        nonAvailability: [],
        uid: "681aca826c38a92a345e2979"
      },
      checkInDate: "2025-12-15T00:00:00.000Z",
      checkOutDate: "2025-12-20T00:00:00.000Z",
      status: "active",
      services: [
        {
          service: {
            _id: "681abba93e12374568dde9fe",
            name: "Masaje Premium",
            description: "Masaje de 90 minutos con aceites esenciales",
            price: 99.99,
            category: "spa",
            available: true,
            createdAt: "2025-05-07T01:47:21.601Z",
            updatedAt: "2025-05-07T01:48:36.952Z"
          },
          quantity: 2,
          _id: "681acd9c6c0cd25574a8b253"
        }
      ],
      createdAt: "2025-05-07T03:03:56.109Z",
      updatedAt: "2025-05-07T03:03:56.109Z"
    }
  ]);
  const [filteredReservations, setFilteredReservations] = useState(reservations);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todas");
  const [sortBy, setSortBy] = useState("date-asc");

  const handleViewDetails = (reservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    filterReservations(value, statusFilter, sortBy);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    filterReservations(searchTerm, status, sortBy);
  };

  const handleSort = (value) => {
    setSortBy(value);
    filterReservations(searchTerm, statusFilter, value);
  };

  const filterReservations = (search, status, sort) => {
    let filtered = reservations;

    if (search) {
      filtered = filtered.filter(reservation => 
        reservation.user.nombre.toLowerCase().includes(search.toLowerCase()) ||
        reservation.user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== "Todas") {
      filtered = filtered.filter(reservation => reservation.status === status.toLowerCase());
    }

    filtered.sort((a, b) => {
      switch (sort) {
        case "date-asc":
          return new Date(a.checkInDate) - new Date(b.checkInDate);
        case "date-desc":
          return new Date(b.checkInDate) - new Date(a.checkInDate);
        case "name":
          return a.user.nombre.localeCompare(b.user.nombre);
        default:
          return 0;
      }
    });

    setFilteredReservations(filtered);
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
              placeholder="Buscar reservaciones..." 
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
              <MenuItem onClick={() => handleStatusFilter("Active")}>Activas</MenuItem>
              <MenuItem onClick={() => handleStatusFilter("Completed")}>Completadas</MenuItem>
              <MenuItem onClick={() => handleStatusFilter("Cancelled")}>Canceladas</MenuItem>
            </MenuList>
          </Menu>
          <Select 
            placeholder="Ordenar por" 
            w="180px"
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="date-asc">Fecha Check-in (Asc)</option>
            <option value="date-desc">Fecha Check-in (Desc)</option>
            <option value="name">Nombre del Huésped</option>
          </Select>
        </HStack>
        <Button colorScheme="blue" leftIcon={<FiPlus />}>
          Nueva Reservación
        </Button>
      </HStack>

      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID Reservación</Th>
              <Th>Huésped</Th>
              <Th>Habitación</Th>
              <Th>Check-in</Th>
              <Th>Check-out</Th>
              <Th>Servicios</Th>
              <Th>Estado</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredReservations.map((reservation) => (
              <Tr key={reservation._id}>
                <Td>RES-{reservation._id.slice(-8)}</Td>
                <Td>
                  <HStack>
                    <Box>
                      <Text fontWeight="medium">{reservation.user.nombre}</Text>
                      <Text fontSize="xs">{reservation.user.email}</Text>
                    </Box>
                  </HStack>
                </Td>
                <Td>
                  <Box>
                    <Text>{reservation.room.type}</Text>
                    <Text fontSize="xs">${reservation.room.price_per_night}/noche</Text>
                  </Box>
                </Td>
                <Td>{new Date(reservation.checkInDate).toLocaleDateString()}</Td>
                <Td>{new Date(reservation.checkOutDate).toLocaleDateString()}</Td>
                <Td>
                  <VStack align="start" spacing={1}>
                    {reservation.services.map((service) => (
                      <Badge key={service._id} colorScheme="purple">
                        {service.service.name} x{service.quantity}
                      </Badge>
                    ))}
                  </VStack>
                </Td>
                <Td>
                  <Badge colorScheme={
                    reservation.status === "active" ? "green" :
                    reservation.status === "completed" ? "blue" : "red"
                  }>
                    {reservation.status === "active" ? "Activa" :
                     reservation.status === "completed" ? "Completada" : "Cancelada"}
                  </Badge>
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton 
                      aria-label="Ver detalles" 
                      icon={<FiEye />} 
                      size="sm" 
                      colorScheme="blue" 
                      variant="ghost"
                      onClick={() => handleViewDetails(reservation)}
                    />
                    <IconButton 
                      aria-label="Editar reservación" 
                      icon={<FiEdit />} 
                      size="sm" 
                      colorScheme="yellow" 
                      variant="ghost" 
                    />
                    <IconButton 
                      aria-label="Cancelar reservación" 
                      icon={<FiCalendar />} 
                      size="sm" 
                      colorScheme="orange" 
                      variant="ghost" 
                    />
                    <IconButton 
                      aria-label="Eliminar reservación" 
                      icon={<FiTrash2 />} 
                      size="sm" 
                      colorScheme="red" 
                      variant="ghost" 
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalles de la Reservación</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedReservation && (
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <GridItem>
                  <VStack align="start" spacing={4}>
                    <Box>
                      <Text fontWeight="bold">Información del Huésped</Text>
                      <Text>Nombre: {selectedReservation.user.nombre}</Text>
                      <Text>Email: {selectedReservation.user.email}</Text>
                      <Text>Rol: {selectedReservation.user.role}</Text>
                      <Text>Estado: {selectedReservation.user.estado ? "Activo" : "Inactivo"}</Text>
                      <Text>Fecha de registro: {new Date(selectedReservation.user.createdAt).toLocaleDateString()}</Text>
                    </Box>
                  </VStack>
                </GridItem>
                <GridItem>
                  <VStack align="start" spacing={4}>
                    <Box>
                      <Text fontWeight="bold">Detalles de la Habitación</Text>
                      <Text>Tipo: {selectedReservation.room.type}</Text>
                      <Text>Capacidad: {selectedReservation.room.capacity} personas</Text>
                      <Text>Precio por noche: ${selectedReservation.room.price_per_night}</Text>
                      <Text>Estado: {selectedReservation.room.available ? "Disponible" : "No Disponible"}</Text>
                      <Text>ID: {selectedReservation.room.uid}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Fechas</Text>
                      <Text>Check-in: {new Date(selectedReservation.checkInDate).toLocaleDateString()}</Text>
                      <Text>Check-out: {new Date(selectedReservation.checkOutDate).toLocaleDateString()}</Text>
                      <Text>Creada: {new Date(selectedReservation.createdAt).toLocaleDateString()}</Text>
                      <Text>Última actualización: {new Date(selectedReservation.updatedAt).toLocaleDateString()}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Servicios Adicionales</Text>
                      <VStack align="start" spacing={2}>
                        {selectedReservation.services.map((service) => (
                          <HStack key={service._id}>
                            <Text>{service.service.name}</Text>
                            <Badge colorScheme="purple">x{service.quantity}</Badge>
                            <Text>(${service.service.price} c/u)</Text>
                            <Text fontSize="xs" color="gray.500">{service.service.description}</Text>
                          </HStack>
                        ))}
                      </VStack>
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

export default ReservationsContent; 