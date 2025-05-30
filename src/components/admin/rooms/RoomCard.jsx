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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FiEdit, FiImage } from "react-icons/fi";
import HotelGallery from "../platform/HotelGallery";

const RoomCard = ({ room, onEdit, onViewDetails, onToggleState }) => {
  const { isOpen: isGalleryOpen, onOpen: onGalleryOpen, onClose: onGalleryClose } = useDisclosure();

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
          <Badge colorScheme={room.state ? "green" : "red"}>
            {room.state ? "Activada" : "Desactivada"}
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
            <Badge colorScheme={room.available ? "green" : "red"}>
              {room.available ? "Activa" : "Inactiva"}
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
            aria-label="Ver galería"
            icon={<FiImage />}
            size="sm"
            colorScheme="blue"
            variant="outline"
            onClick={onGalleryOpen}
          />
          <IconButton
            aria-label="Editar habitación"
            icon={<FiEdit />}
            size="sm"
            colorScheme="yellow"
            variant="outline"
            onClick={() => onEdit(room)}
            isDisabled={!room.available}
            title={!room.available ? "No se puede editar una habitación no disponible" : "Editar habitación"}
          />
          <IconButton
            aria-label={room.available ? "Desactivar habitación" : "Activar habitación"}
            icon={<span>🚫</span>}
            size="sm"
            colorScheme={room.available ? "green" : "orange"}
            variant="outline"
            onClick={() => onToggleState(room)}
          />
        </HStack>
      </Box>

      <Modal isOpen={isGalleryOpen} onClose={onGalleryClose} size="6xl">
        <ModalOverlay />
        <ModalContent maxW="1200px" my="auto">
          <ModalHeader>Galería de Imágenes - Habitación {room.type}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <HotelGallery images={room.images || []} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default RoomCard;