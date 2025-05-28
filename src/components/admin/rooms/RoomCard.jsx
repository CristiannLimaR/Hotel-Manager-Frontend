import React from "react";
import {
  Box,
  HStack,
  VStack,
  Text,
  Heading,
  Badge,
  Divider,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const RoomCard = ({ room, onEdit, onViewDetails, onToggleState, onDelete }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      borderColor="blue.200"
      bg="white"
      boxShadow="sm"
      _hover={{ boxShadow: "md" }}
      transition="all 0.2s"
    >
      <Box p="4">
        <HStack justify="space-between" mb={2}>
          <Heading size="md">Habitación {room.type}</Heading>
          <Badge colorScheme={room.available ? "green" : "red"}>
            {room.available ? "Activada" : "Desactivada"}
          </Badge>
        </HStack>
        <Text fontSize="sm" color="gray.500">
          ID: {room.uid}
        </Text>
        <Divider my={2} />
        <VStack align="start" spacing={2}>
          <HStack justify="space-between" w="full">
            <Text fontSize="sm">Capacidad:</Text>
            <Text fontSize="sm" fontWeight="bold">
              {room.capacity} personas
            </Text>
          </HStack>
          <HStack justify="space-between" w="full">
            <Text fontSize="sm">Precio por noche:</Text>
            <Text fontSize="sm" fontWeight="bold">
              ${room.price_per_night}
            </Text>
          </HStack>
          <HStack justify="space-between" w="full">
            <Text fontSize="sm">Estado:</Text>
            <Badge colorScheme={room.state ? "green" : "red"}>
              {room.state ? "Activa" : "Inactiva"}
            </Badge>
          </HStack>
          <HStack justify="space-between" w="full">
            <Text fontSize="sm">Creada:</Text>
            <Text fontSize="sm">
              {new Date(room.createdAt).toLocaleDateString()}
            </Text>
          </HStack>
        </VStack>
        <HStack mt={4} spacing={2}>
          <Button
            size="sm"
            w="full"
            colorScheme="blue"
            variant="outline"
            onClick={() => onViewDetails(room)}
          >
            Ver Detalles
          </Button>
          <IconButton
            aria-label="Editar habitación"
            icon={<FiEdit />}
            size="sm"
            colorScheme="yellow"
            variant="outline"
            onClick={() => onEdit(room)}
          />
          <IconButton
            aria-label={room.state ? "Desactivar habitación" : "Activar habitación"}
            icon={<span>🚫</span>}
            size="sm"
            colorScheme={room.state ? "orange" : "green"}
            variant="outline"
            onClick={() => onToggleState(room.uid)}
          />
          <IconButton
            aria-label="Eliminar habitación"
            icon={<FiTrash2 />}
            size="sm"
            colorScheme="red"
            variant="outline"
            onClick={() => onDelete(room.uid)}
          />
        </HStack>
      </Box>
    </Box>
  );
};

export default RoomCard;