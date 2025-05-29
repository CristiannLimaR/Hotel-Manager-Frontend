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
} from "@chakra-ui/react";
import { FiSearch, FiFilter, FiPlus } from "react-icons/fi";

const EventsHeader = ({
  searchTerm,
  handleSearch,
  statusFilter,
  handleStatusFilter,
  sortBy,
  handleSort,
  onAddEvent,
  typeFilter,
  handleTypeFilter,
}) => {
  const eventTypes = [
    { value: "", label: "Todos los tipos" },
    { value: "Wedding", label: "Boda" },
    { value: "Conference", label: "Conferencia" },
    { value: "Birthday", label: "Cumpleaños" },
    { value: "Gala", label: "Gala" },
    { value: "Corporate", label: "Corporativo" },
    { value: "Graduation", label: "Graduación" },
    { value: "Anniversary", label: "Aniversario" },
  ];

  return (
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
            <MenuItem onClick={() => handleStatusFilter("Todos los Eventos")}>
              Todos los Eventos
            </MenuItem>
            <MenuItem onClick={() => handleStatusFilter("Activo")}>
              Activos
            </MenuItem>
            <MenuItem onClick={() => handleStatusFilter("Inactivo")}>
              Inactivos
            </MenuItem>
          </MenuList>
        </Menu>
        <Select
          placeholder="Tipo de evento"
          w="180px"
          value={typeFilter}
          onChange={(e) => handleTypeFilter(e.target.value)}
        >
          {eventTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </Select>
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
      <Button colorScheme="blue" leftIcon={<FiPlus />} onClick={onAddEvent}>
        Nuevo Evento
      </Button>
    </HStack>
  );
};

export default EventsHeader;