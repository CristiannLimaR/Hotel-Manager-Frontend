import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  FormErrorMessage,
  useToast,
  Grid,
  GridItem,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Checkbox,
  SimpleGrid,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState, useEffect, useCallback } from 'react';
import useHotel from '../../shared/hooks/useHotel';
import PropTypes from 'prop-types';

const EventForm = ({ onSuccess, eventData = null, isAdmin = false }) => {
  const isEdit = Boolean(eventData);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [hotels, setHotels] = useState([]);
  const { getHotels } = useHotel();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: eventData || {
      name: '',
      description: '',
      date: '',
      hotel: '',
      assignedResources: [],
      additionalServices: [],
      type: '',
    },
  });

  useEffect(() => {
    if (eventData) {
      const formattedData = {
        name: eventData.name || '',
        description: eventData.description || '',
        date: eventData.date || '',
        hotel: eventData.hotel || '',
        assignedResources: eventData.assignedResources || [],
        additionalServices: eventData.additionalServices || [],
        type: eventData.type || ''
      };
      
      Object.keys(formattedData).forEach(key => {
        setValue(key, formattedData[key]);
      });
    }
  }, [eventData, setValue]);

  const fetchHotels = useCallback(async () => {
    try {
      const hotelsData = await getHotels();
      setHotels(hotelsData);
    } catch (err) {
      console.error('Error al cargar hoteles:', err);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los hoteles',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  }, []);

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  const resourceOptions = [
    { value: 'Sala Principal', label: 'Sala Principal' },
    { value: 'Sala de Conferencias', label: 'Sala de Conferencias' },
    { value: 'Jardín', label: 'Jardín' },
    { value: 'Terraza', label: 'Terraza' },
    { value: 'Salón VIP', label: 'Salón VIP' },
    { value: 'Sala de Reuniones', label: 'Sala de Reuniones' },
  ];

  const serviceOptions = [
    { value: 'Catering', label: 'Catering' },
    { value: 'Decoración', label: 'Decoración' },
    { value: 'Música en vivo', label: 'Música en vivo' },
    { value: 'Fotografía', label: 'Fotografía' },
    { value: 'Videografía', label: 'Videografía' },
    { value: 'Animación', label: 'Animación' },
    { value: 'Seguridad', label: 'Seguridad' },
    { value: 'Valet Parking', label: 'Valet Parking' },
    { value: 'Transporte', label: 'Transporte' },
  ];

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formattedData = {
        nombre_evento: data.name,
        descripcion: data.description,
        fecha: data.date,
        recursos_asignados: data.assignedResources,
        servicios_adicionales: data.additionalServices,
        tipo_evento: data.type,
        hotel_id: isAdmin ? eventData?.hotel : data.hotel
      };
      console.log(formattedData)
      
      if (onSuccess) {
        await onSuccess(formattedData, formattedData.hotel_id);
      }
    } catch (err) {
      console.error('Error al guardar evento:', err);
      toast({
        title: 'Error',
        description: 'No se pudo guardar el evento',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (hotels.length === 0) {
    return (
      <Center py={10}>
        <Spinner size="xl" color="teal.500" />
      </Center>
    );
  }

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem colSpan={2}>
          <FormControl isRequired isInvalid={errors.name}>
            <FormLabel>Nombre del Evento</FormLabel>
            <Input
              {...register('name', {
                required: 'El nombre es obligatorio',
                minLength: {
                  value: 3,
                  message: 'El nombre debe tener al menos 3 caracteres',
                },
              })}
              placeholder="Ingrese el nombre del evento"
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <FormControl isRequired isInvalid={errors.description}>
            <FormLabel>Descripción</FormLabel>
            <Textarea
              {...register('description', {
                required: 'La descripción es obligatoria',
                minLength: {
                  value: 10,
                  message: 'La descripción debe tener al menos 10 caracteres',
                },
              })}
              placeholder="Describa el evento"
              rows={4}
            />
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isRequired isInvalid={errors.type}>
            <FormLabel>Tipo de Evento</FormLabel>
            <Select
              {...register('type', {
                required: 'Debe seleccionar un tipo de evento',
              })}
            >
              <option value="">Seleccione un tipo</option>
              <option value="Wedding">Boda</option>
              <option value="Conference">Conferencia</option>
              <option value="Birthday">Cumpleaños</option>
              <option value="Gala">Gala</option>
              <option value="Corporate">Corporativo</option>
              <option value="Graduation">Graduación</option>
              <option value="Anniversary">Aniversario</option>
              <option value="Click">Click</option>
            </Select>
            <FormErrorMessage>
              {errors.type && errors.type.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isRequired isInvalid={errors.date}>
            <FormLabel>Fecha del Evento</FormLabel>
            <Input
              type="datetime-local"
              {...register('date', {
                required: 'La fecha es obligatoria',
              })}
            />
            <FormErrorMessage>
              {errors.date && errors.date.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        {!isAdmin && (
          <GridItem colSpan={2}>
            <FormControl isRequired isInvalid={errors.hotel}>
              <FormLabel>Hotel</FormLabel>
              <Select
                {...register('hotel', {
                  required: 'Debe seleccionar un hotel',
                })}
              >
                <option value="">Seleccione un hotel</option>
                {hotels.map(hotel => (
                  <option key={hotel.uid} value={hotel.uid}>
                    {hotel.name}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.hotel && errors.hotel.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
        )}

        <GridItem colSpan={2}>
          <FormControl isInvalid={errors.assignedResources}>
            <FormLabel>Recursos Asignados</FormLabel>
            <SimpleGrid columns={[2, 3]} spacing={2}>
              {resourceOptions.map(resource => (
                <Checkbox
                  key={resource.value}
                  {...register('assignedResources')}
                  value={resource.value}
                >
                  {resource.label}
                </Checkbox>
              ))}
            </SimpleGrid>
            <FormErrorMessage>
              {errors.assignedResources && errors.assignedResources.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <FormControl isInvalid={errors.additionalServices}>
            <FormLabel>Servicios Adicionales</FormLabel>
            <SimpleGrid columns={[2, 3]} spacing={2}>
              {serviceOptions.map(service => (
                <Checkbox
                  key={service.value}
                  {...register('additionalServices')}
                  value={service.value}
                >
                  {service.label}
                </Checkbox>
              ))}
            </SimpleGrid>
            <FormErrorMessage>
              {errors.additionalServices && errors.additionalServices.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            width="full"
            isLoading={isLoading}
          >
            {isEdit ? 'Actualizar Evento' : 'Crear Evento'}
          </Button>
        </GridItem>
      </Grid>
    </Box>
  );
};

EventForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  eventData: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    hotel: PropTypes.string,
    assignedResources: PropTypes.arrayOf(PropTypes.string),
    additionalServices: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string
  }),
  isAdmin: PropTypes.bool
};

export default EventForm; 