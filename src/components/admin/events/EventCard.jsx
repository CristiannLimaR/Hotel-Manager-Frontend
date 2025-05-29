import {
  Box,
  Badge,
  Text,
  HStack,
  IconButton,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import PropTypes from "prop-types";
import { useState } from "react";
import EventForm from "../../events/EventForm";
import { GenericAlert } from "../../common/GenericAlert";

const EventCard = ({ event, onEdit, onDelete, onDetails }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [formData, setFormData] = useState(null);

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

  const handleEditSubmit = (data) => {
    console.log('Datos del formulario recibidos:', data);
    setFormData(data);
    setIsAlertOpen(true);
  };

  const handleEditSuccess = async () => {
    if (!formData) {
      console.error('No hay datos del formulario');
      return;
    }

    try {
      await onEdit(event._id, formData);
      setIsEditOpen(false);
      setIsAlertOpen(false);
      setFormData(null);
    } catch (error) {
      console.error("Error al actualizar el evento:", error);
    }
  };

  const handleAlertConfirm = () => {
    handleEditSuccess();
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  return (
    <>
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
              onClick={() => setIsEditOpen(true)}
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

      {/* Modal de Edición */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Evento</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <EventForm 
              onSuccess={handleEditSubmit}
              eventData={{
                name: event.nombre_evento,
                description: event.descripcion,
                date: new Date(event.fecha).toISOString().slice(0, 16),
                type: event.tipo_evento,
                assignedResources: event.recursos_asignados || [],
                additionalServices: event.servicios_adicionales || []
              }}
              isAdmin={true}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Alerta de Confirmación */}
      <GenericAlert
        isOpen={isAlertOpen}
        onClose={handleAlertClose}
        title="Confirmar Edición"
        description="¿Estás seguro de que deseas guardar los cambios en este evento?"
        confirmButtonText="Guardar"
        confirmButtonColor="blue"
        onConfirm={handleAlertConfirm}
      />
    </>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    nombre_evento: PropTypes.string.isRequired,
    descripcion: PropTypes.string,
    fecha: PropTypes.string.isRequired,
    tipo_evento: PropTypes.string,
    status: PropTypes.string.isRequired,
    recursos_asignados: PropTypes.arrayOf(PropTypes.string),
    servicios_adicionales: PropTypes.arrayOf(PropTypes.string),
    hotel_id: PropTypes.string
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDetails: PropTypes.func.isRequired
};

export default EventCard;