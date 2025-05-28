import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  CheckboxGroup,
  Checkbox,
  Stack,
  Button,
} from "@chakra-ui/react";

const EventFormModal = ({
  isOpen,
  onClose,
  form,
  handleChange,
  handleRecursosChange,
  handleSubmit,
  editingEventId,
  recursosDisponibles,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered motionPreset="scale">
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
          <FormControl mb={4} isRequired>
            <FormLabel fontWeight="bold" color="blue.700">
              Nombre del Evento
            </FormLabel>
            <Input
              name="nombre_evento"
              value={form.nombre_evento}
              onChange={handleChange}
              placeholder="Nombre del evento"
              focusBorderColor="blue.400"
              size="lg"
              borderRadius="md"
              boxShadow="sm"
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel fontWeight="bold" color="blue.700">
              Descripción
            </FormLabel>
            <Textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              placeholder="Descripción del evento"
              focusBorderColor="blue.400"
              size="md"
              borderRadius="md"
              boxShadow="sm"
            />
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel fontWeight="bold" color="blue.700">
              Fecha
            </FormLabel>
            <Input
              name="fecha"
              type="date"
              value={form.fecha}
              onChange={handleChange}
              focusBorderColor="blue.400"
              size="md"
              borderRadius="md"
              boxShadow="sm"
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel fontWeight="bold" color="blue.700">
              Recursos Asignados
            </FormLabel>
            <CheckboxGroup
              value={form.recursos_asignados}
              onChange={handleRecursosChange}
            >
              <Stack spacing={2} direction="column" pl={2}>
                {recursosDisponibles.map((recurso) => (
                  <Checkbox key={recurso} value={recurso} colorScheme="blue">
                    {recurso}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel fontWeight="bold" color="blue.700">
              Tipo de Evento
            </FormLabel>
            <Input
              name="tipo_evento"
              value={form.tipo_evento}
              onChange={handleChange}
              placeholder="Ej. Conferencia, Reunión, Taller"
              focusBorderColor="blue.400"
              size="md"
              borderRadius="md"
              boxShadow="sm"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit}
            size="md"
            fontWeight="bold"
            textTransform="uppercase"
            boxShadow="md"
            _hover={{ bg: "blue.600" }}
          >
            {editingEventId ? "Actualizar" : "Guardar"}
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            size="md"
            fontWeight="bold"
            _hover={{ bg: "gray.100" }}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventFormModal;