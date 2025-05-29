import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Box,
  Flex,
  Spinner,
} from "@chakra-ui/react";

const EventDetailsModal = ({ isOpen, onClose, eventDetails, loadingDetails }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered motionPreset="scale">
      <ModalOverlay bg="blackAlpha.600" />
      <ModalContent borderRadius="xl" boxShadow="2xl" p={4}>
        <ModalHeader
          fontWeight="extrabold"
          textTransform="uppercase"
          letterSpacing="wider"
          color="blue.700"
        >
          Detalles del Evento
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody fontSize="md" color="gray.700" pt={4}>
          {loadingDetails ? (
            <Flex justify="center" align="center" minH="150px">
              <Spinner size="lg" color="blue.500" />
            </Flex>
          ) : eventDetails ? (
            <Box lineHeight="tall" px={2}>
              <Text mb={2}>
                <strong>Nombre:</strong> {eventDetails.nombre_evento}
              </Text>
              <Text mb={2}>
                <strong>Descripción:</strong> {eventDetails.descripcion || "N/A"}
              </Text>
              <Text mb={2}>
                <strong>Fecha:</strong>{" "}
                {new Date(eventDetails.fecha).toLocaleDateString()}
              </Text>
              <Text mb={2}>
                <strong>Tipo:</strong> {eventDetails.tipo_evento || "N/A"}
              </Text>
              <Text mb={2}>
                <strong>Estado:</strong>{" "}
                <Text
                  as="span"
                  color={eventDetails.status === "Activo" ? "green.500" : "red.400"}
                  fontWeight="bold"
                >
                  {eventDetails.status || "N/A"}
                </Text>
              </Text>
              <Text mb={2}>
                <strong>Recursos:</strong>{" "}
                {(eventDetails.recursos_asignados || []).join(", ") || "Ninguno"}
              </Text>
              {/* Added location and capacity based on previous design */}
              {eventDetails.location && (
                <Text mb={2}>
                  <strong>Ubicación:</strong> {eventDetails.location}
                </Text>
              )}
              {eventDetails.capacity && (
                <Text mb={2}>
                  <strong>Capacidad:</strong> {eventDetails.capacity} personas
                </Text>
              )}
              {/* Removed Organizer from here as per request */}
            </Box>
          ) : (
            <Text textAlign="center" color="gray.500">
              No se pudieron cargar los detalles del evento.
            </Text>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            variant="ghost"
            onClick={onClose}
            size="md"
            fontWeight="bold"
            _hover={{ bg: "gray.100" }}
          >
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventDetailsModal;