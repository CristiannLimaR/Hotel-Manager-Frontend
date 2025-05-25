import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Switch,
  VStack,
  HStack,
  useDisclosure,
  useToast,
  Icon,
} from '@chakra-ui/react';
import { FiPlus, FiSave, FiX } from 'react-icons/fi';
import { createService, updateService } from '../../../services/api';
import useHotel from '../../../shared/hooks/useHotel';

const ServiceForm = ({ refreshServices, editingService = null, onEditComplete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();
  const { getHotelsByAdmin } = useHotel();
  const [hotelId, setHotelId] = useState(null);

  const isEditing = Boolean(editingService);

  useEffect(() => {
    const fetchHotelId = async () => {
      try {
        const hotel = await getHotelsByAdmin();
        if (hotel) {
          setHotelId(hotel.uid);
        }
      } catch (error) {
        console.error('Error al obtener el ID del hotel:', error);
        toast({
          title: 'Error',
          description: 'No se pudo obtener el ID del hotel',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };
    fetchHotelId();
  }, []);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    available: true,
  });

  // Efecto para cargar datos cuando se edita
  useEffect(() => {
    if (editingService) {
      setFormData({
        name: editingService.name || '',
        description: editingService.description || '',
        price: editingService.price?.toString() || '',
        category: editingService.category || '',
        available: editingService.available ?? true,
      });
      onOpen();
    }
  }, [editingService, onOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Resetear formulario
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      available: true,
    });
  };

  // Mensajes formulario
  const validateForm = () => {
    const errors = [];
    
    if (!formData.name.trim()) errors.push('El nombre es requerido');
    if (!formData.description.trim()) errors.push('La descripción es requerida');
    if (!formData.price || parseFloat(formData.price) < 0) errors.push('El precio debe ser válido');
    if (!formData.category) errors.push('La categoría es requerida');

    if (errors.length > 0) {
      toast({
        title: 'Errores de validación',
        description: errors.join(', '),
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (!hotelId) {
      toast({
        title: 'Error',
        description: 'No se pudo obtener el ID del hotel',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setSubmitting(true);

    try {
      const serviceData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        category: formData.category,
        available: formData.available,
        hotel: hotelId
      };

      let response;
      if (isEditing) {
        response = await updateService(editingService._id, serviceData);
      } else {
        response = await createService(serviceData);
      }

      if (response?.error) {
        throw new Error(response.message || `Error al ${isEditing ? 'actualizar' : 'crear'} servicio`);
      }

      toast({
        title: `Servicio ${isEditing ? 'actualizado' : 'creado'}`,
        status: 'success',
        duration: 3000,
      });

      await refreshServices?.();
      handleModalClose();
      
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'creating'} service:`, error);
      
      toast({
        title: 'Error',
        description: error.message || `Error al ${isEditing ? 'actualizar' : 'crear'} el servicio`,
        status: 'error',
        duration: 5000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleModalClose = () => {
    onClose();
    resetForm();
    if (isEditing && onEditComplete) {
      onEditComplete();
    }
  };

  return (
    <>
      {!isEditing && (
        <Button
          leftIcon={<Icon as={FiPlus} />}
          colorScheme="teal"
          onClick={onOpen}
        >
          Crear Nuevo Servicio
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={handleModalClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isEditing ? 'Editar Servicio' : 'Crear Nuevo Servicio'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nombre del servicio"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Descripción</FormLabel>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Descripción del servicio"
                    rows={3}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Precio</FormLabel>
                  <Input
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Categoría</FormLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="Selecciona una categoría"
                  >
                    <option value="room">Habitación</option>
                    <option value="restaurant">Restaurante</option>
                    <option value="spa">Spa</option>
                    <option value="event">Eventos</option>
                    <option value="other">Otros</option>
                  </Select>
                </FormControl>

                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">Servicio disponible</FormLabel>
                  <Switch
                    name="available"
                    isChecked={formData.available}
                    onChange={handleInputChange}
                    colorScheme="teal"
                  />
                </FormControl>

                <HStack spacing={3} pt={4} width="100%">
                  <Button
                    variant="ghost"
                    onClick={handleModalClose}
                    flex={1}
                    disabled={submitting}
                    leftIcon={<Icon as={FiX} />}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    colorScheme="teal"
                    isLoading={submitting}
                    loadingText={isEditing ? "Actualizando..." : "Creando..."}
                    flex={1}
                    leftIcon={<Icon as={FiSave} />}
                  >
                    {isEditing ? "Actualizar" : "Crear"}
                  </Button>
                </HStack>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ServiceForm;