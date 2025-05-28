import {
  Box,
  Badge,
  Text,
  HStack,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

const EventCard = ({ event, onEdit, onDelete, onDetails }) => {
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

  const getStatusColorScheme = (status) => {
    return status === "Activo" ? "green" : "red";
  };

  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      bg="white"
      _hover={{ transform: "translateY(-5px)", shadow: "lg" }}
      transition="all 0.2s ease-in-out"
      borderColor="gray.200"
    >
      <HStack justifyContent="space-between" mb={2}>
        <Text fontSize="xl" fontWeight="semibold" color="blue.700">
          {event.nombre_evento}
        </Text>
        <Badge colorScheme={getTypeColorScheme(event.tipo_evento)} px={3} py={1} borderRadius="full">
          {event.tipo_evento || "N/A"}
        </Badge>
      </HStack>

      <Text fontSize="sm" color="gray.600" mb={3}>
        {event.descripcion || "Sin descripción."}
      </Text>

      <HStack spacing={4} mb={3}>
        <Text fontSize="sm" color="gray.700">
          <Text as="span" fontWeight="bold">Fecha:</Text> {new Date(event.fecha).toLocaleDateString()}
        </Text>
      </HStack>

      <Flex justifyContent="space-between" alignItems="center" pt={2} borderTop="1px" borderColor="gray.100">
        <Badge colorScheme={getStatusColorScheme(event.status)} px={3} py={1} borderRadius="md" textTransform="uppercase">
          {event.status}
        </Badge>
        <HStack spacing={1}>
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
          <IconButton
            aria-label="Eliminar evento"
            icon={<FiTrash2 />}
            size="sm"
            colorScheme="red"
            variant="ghost"
            onClick={() => onDelete(event._id)}
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default EventCard;