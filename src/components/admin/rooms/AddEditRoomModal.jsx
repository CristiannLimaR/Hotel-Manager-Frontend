import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
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
  SimpleGrid,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { FiPlus, FiX } from "react-icons/fi";
import useAuthStore from "../../../shared/stores/authStore";
import useHotel from "../../../shared/hooks/useHotel";

const AddEditRoomModal = ({ isOpen, onClose, roomToEdit, onSave }) => {
  const [newRoom, setNewRoom] = useState({
    type: "",
    capacity: 1,
    price_per_night: 0,
  });
  const [hotelId, setHotelId] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const toast = useToast();
  const { user } = useAuthStore();
  const { getHotelsByAdmin } = useHotel();

  const isEditing = !!roomToEdit;

  useEffect(() => {
    const fetchHotelId = async () => {
      try {
        const hotelResponse = await getHotelsByAdmin();
        if (!hotelResponse.error) {
          setHotelId(hotelResponse.uid);
        } else {
          toast({
            title: "Error",
            description: "No se pudo obtener la información del hotel.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error("Error al obtener el hotel:", error);
      }
    };

    if (isOpen && !isEditing) {
      fetchHotelId();
    }
  }, [isOpen, isEditing, user.id]);

  useEffect(() => {
    if (isEditing && roomToEdit) {
      setNewRoom({
        type: roomToEdit.type,
        capacity: roomToEdit.capacity,
        price_per_night: roomToEdit.price_per_night,
      });
      setExistingImages(roomToEdit.images || []);
    } else {
      setNewRoom({ type: "", capacity: 1, price_per_night: 0 });
      setExistingImages([]);
    }
  }, [isOpen, isEditing, roomToEdit]);

  useEffect(() => {
    // Limpiar las URLs anteriores antes de crear nuevas
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    
    const urls = newImages.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);

    return () => {
      urls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [newImages]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(prev => [...prev, ...files]);
  };

  const removeExistingImage = (url) => {
    setExistingImages((imgs) => imgs.filter((img) => img !== url));
    setDeletedImages((prev) => [...prev, url]);
  };

  const removeNewImage = (index) => {
    URL.revokeObjectURL(previewUrls[index]);
    setNewImages(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

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

    const formData = new FormData();
    formData.append('type', newRoom.type.trim());
    formData.append('capacity', Number(newRoom.capacity));
    formData.append('price_per_night', Number(newRoom.price_per_night));
    formData.append('hotel_id', isEditing ? roomToEdit.hotel_id : hotelId);

    // Agregar imágenes existentes y eliminadas
    if (isEditing) {
      existingImages.forEach((img, index) => {
        formData.append(`existingImages[${index}]`, img);
      });
      if (deletedImages.length > 0) {
        deletedImages.forEach((img, index) => {
          formData.append(`deletedImages[${index}]`, img);
        });
      }
    }

    // Agregar nuevas imágenes
    newImages.forEach(img => formData.append('images', img));

    const success = await onSave(isEditing ? roomToEdit.uid : null, formData);
    if (success) {
      toast({
        title: isEditing ? "Habitación actualizada" : "Habitación creada",
        description: "La operación se completó exitosamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } else {
      toast({
        title: "Error",
        description: "Hubo un error al procesar la solicitud",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isEditing ? "Editar Habitación" : "Agregar Habitación"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Tipo de Habitación</FormLabel>
              <Input
                value={newRoom.type}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, type: e.target.value })
                }
                placeholder="Ej: Individual, Doble, Suite..."
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Capacidad</FormLabel>
              <NumberInput
                min={1}
                value={newRoom.capacity}
                onChange={(value) =>
                  setNewRoom({ ...newRoom, capacity: parseInt(value) })
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
              <FormLabel>Precio por Noche</FormLabel>
              <NumberInput
                min={0}
                value={newRoom.price_per_night}
                onChange={(value) =>
                  setNewRoom({ ...newRoom, price_per_night: parseInt(value) })
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
              <FormLabel>Imágenes</FormLabel>
              <VStack spacing={4} align="stretch">
                <Box>
                  <Input
                    type="file"
                    accept="image/*,.webp"
                    multiple
                    onChange={handleImageChange}
                    display="none"
                    id="image-upload"
                  />
                  <Button
                    as="label"
                    htmlFor="image-upload"
                    leftIcon={<FiPlus />}
                    colorScheme="blue"
                    variant="outline"
                    w="full"
                  >
                    Agregar Imágenes
                  </Button>
                </Box>

                {(existingImages.length > 0 || previewUrls.length > 0) && (
                  <SimpleGrid columns={[2, 3, 4]} spacing={4}>
                    {existingImages.map((img, index) => (
                      <Box key={`existing-${index}`} position="relative">
                        <Image
                          src={img}
                          alt={`Imagen ${index + 1}`}
                          borderRadius="lg"
                          objectFit="cover"
                          h="150px"
                          w="full"
                        />
                        <IconButton
                          icon={<FiX />}
                          size="sm"
                          colorScheme="red"
                          position="absolute"
                          top={2}
                          right={2}
                          onClick={() => removeExistingImage(img)}
                        />
                      </Box>
                    ))}
                    {previewUrls.map((url, index) => (
                      <Box key={`new-${index}`} position="relative">
                        <Image
                          src={url}
                          alt={`Nueva imagen ${index + 1}`}
                          borderRadius="lg"
                          objectFit="cover"
                          h="150px"
                          w="full"
                        />
                        <IconButton
                          icon={<FiX />}
                          size="sm"
                          colorScheme="red"
                          position="absolute"
                          top={2}
                          right={2}
                          onClick={() => removeNewImage(index)}
                        />
                      </Box>
                    ))}
                  </SimpleGrid>
                )}
              </VStack>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            {isEditing ? "Actualizar" : "Crear"}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

AddEditRoomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  roomToEdit: PropTypes.shape({
    uid: PropTypes.string,
    type: PropTypes.string,
    capacity: PropTypes.number,
    price_per_night: PropTypes.number,
    hotel_id: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
  }),
  onSave: PropTypes.func.isRequired,
};

export default AddEditRoomModal;
