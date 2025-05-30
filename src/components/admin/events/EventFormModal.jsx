import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import EventForm from "../../events/EventForm";

const EventFormModal = ({
  isOpen,
  onClose,
  form,
  editingEventId
}) => {
  const handleSuccess = async (formattedData) => {
    // Aquí manejamos el éxito del formulario
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered motionPreset="scale">
      <ModalOverlay bg="blackAlpha.600" />
      <ModalContent borderRadius="xl" boxShadow="2xl" p={4}>
        <ModalHeader
          bgGradient="linear(to-r, blue.400, blue.600)"
          color="white"
          borderTopRadius="xl"
          fontWeight="extrabold"
          textTransform="uppercase"
          letterSpacing="wider"
        >
          {editingEventId ? "Editar evento" : "Agregar nuevo evento"}
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody pt={6}>
          <EventForm 
            onSuccess={handleSuccess}
            eventData={editingEventId ? {
              name: form.nombre_evento,
              description: form.descripcion,
              date: form.fecha,
              hotel: form.hotel_id,
              assignedResources: form.recursos_asignados,
              additionalServices: form.servicios_adicionales,
              type: form.tipo_evento
            } : null}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EventFormModal;