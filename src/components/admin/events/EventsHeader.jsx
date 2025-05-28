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
}) => {
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
            <MenuItem onClick={() => handleStatusFilter("Programado")}>
              Programados
            </MenuItem>
            <MenuItem onClick={() => handleStatusFilter("En Preparación")}>
              En Preparación
            </MenuItem>
            <MenuItem onClick={() => handleStatusFilter("Completado")}>
              Completados
            </MenuItem>
            <MenuItem onClick={() => handleStatusFilter("Cancelado")}>
              Cancelados
            </MenuItem>
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
      <Button colorScheme="blue" leftIcon={<FiPlus />} onClick={onAddEvent}>
        Nuevo Evento
      </Button>
    </HStack>
  );
};

export default EventsHeader;