import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Text,
  Badge,
  HStack,
  VStack,
  Grid,
  GridItem,
  Image,
} from "@chakra-ui/react";

const RoomDetailsModal = ({ isOpen, onClose, room }) => {
  if (!room) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detalles de la Habitación</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
            <GridItem>
              <VStack align="start" spacing={4}>
                <Box>
                  <Text fontWeight="bold" fontSize="lg" mb={1}>
                    Información General
                  </Text>
                  <Text>
                    <Text as="span" fontWeight="semibold">
                      Tipo:
                    </Text>{" "}
                    {room.type}
                  </Text>
                  <Text>
                    <Text as="span" fontWeight="semibold">
                      ID:
                    </Text>{" "}
                    {room.uid}
                  </Text>
                  <Text>
                    <Text as="span" fontWeight="semibold">
                      Hotel ID:
                    </Text>{" "}
                    {room.hotel_id}
                  </Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" fontSize="lg" mb={1}>
                    Capacidad y Precios
                  </Text>
                  <Text>
                    <Text as="span" fontWeight="semibold">
                      Capacidad:
                    </Text>{" "}
                    {room.capacity} personas
                  </Text>
                  <Text>
                    <Text as="span" fontWeight="semibold">
                      Precio por noche:
                    </Text>{" "}
                    ${room.price_per_night}
                  </Text>
                </Box>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack align="start" spacing={4}>
                <Box>
                  <Text fontWeight="bold" fontSize="lg" mb={1}>
                    Estado
                  </Text>
                  <HStack spacing={2}>
                    <Badge colorScheme={room.available ? "green" : "red"}>
                      {room.available ? "Activada" : "Desactivada"}
                    </Badge>
                    <Badge colorScheme={room.state ? "green" : "red"}>
                      {room.state ? "Activa" : "Inactiva"}
                    </Badge>
                  </HStack>
                </Box>
                <Box>
                  <Text fontWeight="bold" fontSize="lg" mb={1}>
                    Fechas
                  </Text>
                  <Text>
                    <Text as="span" fontWeight="semibold">
                      Creada:
                    </Text>{" "}
                    {new Date(room.createdAt).toLocaleDateString()}
                  </Text>
                  <Text>
                    <Text as="span" fontWeight="semibold">
                      Última actualización:
                    </Text>{" "}
                    {new Date(room.updatedAt).toLocaleDateString()}
                  </Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" fontSize="lg" mb={1}>
                    Imágenes
                  </Text>
                  {room.images && room.images.length > 0 ? (
                    <Image
                      src={room.images[0]}
                      alt={`Imagen de ${room.type}`}
                      borderRadius="md"
                      maxH="200px"
                      objectFit="cover"
                    />
                  ) : (
                    <Text color="gray.500">No hay imágenes disponibles.</Text>
                  )}
                </Box>
              </VStack>
            </GridItem>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RoomDetailsModal;