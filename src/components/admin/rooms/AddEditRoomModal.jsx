import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Image,
  useToast,
} from "@chakra-ui/react";

const AddEditRoomModal = ({ isOpen, onClose, roomToEdit, onSave }) => {
  const [newRoom, setNewRoom] = useState({
    type: "",
    capacity: 1,
    price_per_night: 0,
    image: "",
  });
  const toast = useToast();

  const isEditing = !!roomToEdit;

  useEffect(() => {
    if (isEditing && roomToEdit) {
      setNewRoom({
        type: roomToEdit.type,
        capacity: roomToEdit.capacity,
        price_per_night: roomToEdit.price_per_night,
        image: roomToEdit.images?.[0] || "",
      });
    } else {
      setNewRoom({ type: "", capacity: 1, price_per_night: 0, image: "" });
    }
  }, [isOpen, isEditing, roomToEdit]);

  const handleSubmit = async () => {
    if (
      !newRoom.type.trim() ||
      newRoom.capacity <= 0 ||
      newRoom.price_per_night < 0
    ) {
      toast({
        title: "Datos inválidos",
        description:
          "Completa todos los campos correctamente (tipo, capacidad > 0, precio >= 0).",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const roomData = {
      type: newRoom.type.trim(),
      capacity: Number(newRoom.capacity),
      price_per_night: Number(newRoom.price_per_night),
      images: newRoom.image ? [newRoom.image.trim()] : [],
      available: true, // Default for new rooms, state is handled by toggle
      state: true, // Default for new rooms, state is handled by toggle
    };

    const success = await onSave(isEditing ? roomToEdit.uid : null, roomData);
    if (success) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEditing ? "Editar" : "Agregar"} Habitación</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Tipo de Habitación</FormLabel>
              <Input
                placeholder="Ej: Deluxe, Suite, Estándar"
                value={newRoom.type}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, type: e.target.value })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Capacidad (personas)</FormLabel>
              <NumberInput
                min={1}
                value={newRoom.capacity}
                onChange={(valueString) =>
                  setNewRoom({ ...newRoom, capacity: parseInt(valueString) })
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Precio por Noche ($)</FormLabel>
              <NumberInput
                min={0}
                precision={2}
                value={newRoom.price_per_night}
                onChange={(valueString) =>
                  setNewRoom({
                    ...newRoom,
                    price_per_night: parseFloat(valueString),
                  })
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>URL de Imagen (Opcional)</FormLabel>
              <Input
                placeholder="http://example.com/imagen.jpg"
                value={newRoom.image}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, image: e.target.value })
                }
              />
              {newRoom.image && (
                <Image
                  src={newRoom.image}
                  alt="Vista previa"
                  mt={3}
                  borderRadius="md"
                  maxH="150px"
                  objectFit="cover"
                />
              )}
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            {isEditing ? "Actualizar" : "Agregar"}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddEditRoomModal;