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
  Text,
  IconButton,
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

const EventsContent = () => {
  const [events, setEvents] = useState([
    {
      id: "1",
      name: "Conferencia Tech 2025",
      type: "Conferencia",
      location: "Sala Principal",
      date: "2025-05-15T00:00:00.000Z",
      capacity: 200,
      status: "Programado",
      organizer: "Juan Pérez"
    },
    {
      id: "2",
      name: "Boda María & Carlos",
      type: "Boda",
      location: "Jardín",
      date: "2025-05-20T00:00:00.000Z",
      capacity: 150,
      status: "En Preparación",
      organizer: "Ana García"
    },
    {
      id: "3",
      name: "Cena de Gala Empresarial",
      type: "Cena",
      location: "Salón VIP",
      date: "2025-05-25T00:00:00.000Z",
      capacity: 100,
      status: "Cancelado",
      organizer: "Roberto Martínez"
    }
  ]);
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos los Eventos");
  const [sortBy, setSortBy] = useState("date-asc");

  const handleSearch = (value) => {
    setSearchTerm(value);
    filterEvents(value, statusFilter, sortBy);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    filterEvents(searchTerm, status, sortBy);
  };

  const handleSort = (value) => {
    setSortBy(value);
    filterEvents(searchTerm, statusFilter, value);
  };

  const filterEvents = (search, status, sort) => {
    let filtered = events;

    if (search) {
      filtered = filtered.filter(event => 
        event.name.toLowerCase().includes(search.toLowerCase()) ||
        event.organizer.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== "Todos los Eventos") {
      filtered = filtered.filter(event => event.status === status);
    }

    filtered.sort((a, b) => {
      switch (sort) {
        case "date-asc":
          return new Date(a.date) - new Date(b.date);
        case "date-desc":
          return new Date(b.date) - new Date(a.date);
        case "name":
          return a.name.localeCompare(b.name);
        case "type":
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });

    setFilteredEvents(filtered);
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
              placeholder="Buscar eventos..." 
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
              <MenuItem onClick={() => handleStatusFilter("Todos los Eventos")}>Todos los Eventos</MenuItem>
              <MenuItem onClick={() => handleStatusFilter("Programado")}>Programados</MenuItem>
              <MenuItem onClick={() => handleStatusFilter("En Preparación")}>En Curso</MenuItem>
              <MenuItem onClick={() => handleStatusFilter("Completado")}>Completados</MenuItem>
              <MenuItem onClick={() => handleStatusFilter("Cancelado")}>Cancelados</MenuItem>
            </MenuList>
          </Menu>
          <Select 
            placeholder="Ordenar por" 
            w="180px"
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="date-asc">Fecha (Ascendente)</option>
            <option value="date-desc">Fecha (Descendente)</option>
            <option value="name">Nombre del Evento</option>
            <option value="type">Tipo de Evento</option>
          </Select>
        </HStack>
        <Button colorScheme="blue" leftIcon={<FiPlus />}>
          Nuevo Evento
        </Button>
      </HStack>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nombre del Evento</Th>
            <Th>Tipo</Th>
            <Th>Fecha</Th>
            <Th>Capacidad</Th>
            <Th>Estado</Th>
            <Th>Organizador</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredEvents.map((event) => (
            <Tr key={event.id}>
              <Td>
                <HStack>
                  <Box>
                    <Text fontWeight="medium">{event.name}</Text>
                    <Text fontSize="xs" color="gray.500">{event.location}</Text>
                  </Box>
                </HStack>
              </Td>
              <Td><Badge colorScheme={
                event.type === "Conferencia" ? "blue" :
                event.type === "Boda" ? "purple" : "green"
              }>{event.type}</Badge></Td>
              <Td>{new Date(event.date).toLocaleDateString()}</Td>
              <Td>{event.capacity} personas</Td>
              <Td><Badge colorScheme={
                event.status === "Programado" ? "green" :
                event.status === "En Preparación" ? "blue" :
                event.status === "Completado" ? "purple" : "red"
              }>{event.status}</Badge></Td>
              <Td>{event.organizer}</Td>
              <Td>
                <HStack spacing={2}>
                  <IconButton aria-label="Ver detalles" icon={<FiEye />} size="sm" colorScheme="blue" variant="ghost" />
                  <IconButton aria-label="Editar evento" icon={<FiEdit />} size="sm" colorScheme="yellow" variant="ghost" />
                  <IconButton aria-label="Cancelar evento" icon={<FiCalendar />} size="sm" colorScheme="orange" variant="ghost" />
                  <IconButton aria-label="Eliminar evento" icon={<FiTrash2 />} size="sm" colorScheme="red" variant="ghost" />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default EventsContent; 