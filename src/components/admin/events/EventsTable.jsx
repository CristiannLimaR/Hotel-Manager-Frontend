import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Text,
  HStack,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

const EventsTable = ({ events, onEdit, onDelete, onDetails }) => {
  const getStatusColorScheme = (status) => {
    switch (status) {
      case "Programado":
        return "green";
      case "En Preparación":
        return "blue";
      case "Completado":
        return "purple";
      case "Cancelado":
        return "red";
      default:
        return "gray"; 
    }
  };

  const getTypeColorScheme = (type) => {
    switch (type) {
      case "Conferencia":
        return "blue";
      case "Boda":
        return "purple";
      case "Cena":
        return "green";
      case "Reunión":
        return "orange";
      default:
        return "teal"; 
    }
  };

  return (
    <Box overflowX="auto" borderRadius="lg" boxShadow="md">
      <Table
        variant="striped"
        colorScheme="blue"
        size="md"
        borderRadius="lg"
        sx={{
          "thead > tr": { bg: "blue.100" },
          "tbody > tr:hover": { bg: "blue.50", cursor: "pointer" },
        }}
      >
        <Thead>
          <Tr>
            <Th>Nombre del Evento</Th>
            <Th>Tipo</Th>
            <Th>Fecha</Th>
            <Th>Estado</Th>
            <Th>Organizador</Th> {/* Assuming organizer is still a field */}
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {events.map((event) => (
            <Tr key={event._id}>
              <Td>
                <HStack>
                  <Box>
                    <Text fontWeight="medium">{event.nombre_evento}</Text>
                    {event.location && ( // Assuming 'location' might be a field in your event object now
                      <Text fontSize="xs" color="gray.500">
                        {event.location}
                      </Text>
                    )}
                  </Box>
                </HStack>
              </Td>
              <Td>
                <Badge colorScheme={getTypeColorScheme(event.tipo_evento)}>
                  {event.tipo_evento || "N/A"}
                </Badge>
              </Td>
              <Td>{new Date(event.fecha).toLocaleDateString()}</Td>
              <Td>
                <Badge colorScheme={getStatusColorScheme(event.status)}>
                  {event.status || "N/A"}
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
                    onClick={() => onDetails(event._id)}
                  />
                  <IconButton
                    aria-label="Editar evento"
                    icon={<FiEdit />}
                    size="sm"
                    colorScheme="yellow"
                    variant="ghost"
                    onClick={() => onEdit(event)}
                  />
                  {/* Removed the FiCalendar button as its original purpose was "Cancelar evento" and you have a status field now */}
                  <IconButton
                    aria-label="Eliminar evento"
                    icon={<FiTrash2 />}
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                    onClick={() => onDelete(event._id)}
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default EventsTable;