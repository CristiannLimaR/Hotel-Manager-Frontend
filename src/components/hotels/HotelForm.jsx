import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Textarea,
    Image,
    SimpleGrid,
    Checkbox,
    useToast,
    HStack,
    Grid,
    GridItem,
    IconButton,
    VStack,
    FormErrorMessage,
  } from '@chakra-ui/react';
  import { useForm } from 'react-hook-form';
  import { useState, useEffect } from 'react';
  import { FiPlus, FiX } from 'react-icons/fi';
  import PropTypes from 'prop-types';
  import AdminSearch from './AdminSearch';
  
  const HotelForm = ({ hotelData = null, onSuccess }) => {
    const isEdit = Boolean(hotelData);
    const toast = useToast();
    const [selectedAdmin, setSelectedAdmin] = useState(null);
  
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      watch,
      setValue,
    } = useForm({
      defaultValues: {
        name: '',
        direction: '',
        category: '',
        rangeOfPrices: {
          min: '',
          max: '',
        },
        facilities: [],
        services: [],
      },
    });
  
    const [existingImages, setExistingImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
  
    const minPrice = watch('rangeOfPrices.min');
    
    const maxPrice = watch('rangeOfPrices.max');
  
    useEffect(() => {
      if (hotelData) {
        reset({
          name: hotelData.name,
          direction: hotelData.direction,
          category: hotelData.category,
          rangeOfPrices: {
            min: hotelData.rangeOfPrices?.min || '',
            max: hotelData.rangeOfPrices?.max || '',
          },
          facilities: hotelData.facilities || [],
          services: hotelData.services || [],
        });
        setExistingImages(hotelData.images || []);
        setSelectedAdmin(hotelData.admin || null);
      }
    }, [hotelData, reset]);

    useEffect(() => {
      if (minPrice && maxPrice && Number(minPrice) >= Number(maxPrice)) {
        setValue('rangeOfPrices.max', '', { shouldValidate: true });
      }
    }, [minPrice, maxPrice, setValue]);

    useEffect(() => {
      // Crear URLs de vista previa para las nuevas imágenes
      const urls = newImages.map(file => URL.createObjectURL(file));
      setPreviewUrls(urls);

      // Limpiar URLs cuando el componente se desmonte o las imágenes cambien
      return () => {
        urls.forEach(url => URL.revokeObjectURL(url));
      };
    }, [newImages]);
  
    const onSubmit = async (data) => {
      try {
        const formData = new FormData();
  
        formData.append('name', data.name);
        formData.append('direction', data.direction);
        formData.append('category', data.category);
        formData.append('rangeOfPrices[min]', data.rangeOfPrices.min);
        formData.append('rangeOfPrices[max]', data.rangeOfPrices.max);
        if (selectedAdmin) {
          formData.append('adminId', selectedAdmin.id);
        }
  
        data.facilities?.forEach((s) => formData.append('facilities', s));
        data.services?.forEach((s) => formData.append('services', s));
        existingImages.forEach((url) => formData.append('existingImages', url));
        newImages.forEach((file) => formData.append('images', file));

        // Aquí iría la llamada a la API para guardar el hotel
        // const response = await saveHotel(formData);
        
        toast({
          title: isEdit ? 'Hotel actualizado' : 'Hotel creado',
          description: isEdit ? 'El hotel se ha actualizado correctamente' : 'El hotel se ha creado correctamente',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });

        if (onSuccess) {
          onSuccess();
        }
      } catch (err) {
        console.error(err);
        toast({
          title: 'Error al guardar el hotel',
          description: err.response?.data?.msg || 'Ocurrió un error inesperado',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      }
    };
  
    const handleImageChange = (e) => {
      const files = Array.from(e.target.files);
      setNewImages(prev => [...prev, ...files]);
    };
  
    const removeExistingImage = (url) => {
      setExistingImages((imgs) => imgs.filter((img) => img !== url));
    };

    const removeNewImage = (index) => {
      setNewImages(prev => prev.filter((_, i) => i !== index));
    };
  
    return (
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem colSpan={2}>
            <FormControl isRequired isInvalid={errors.name}>
              <FormLabel>Nombre</FormLabel>
              <Input
                {...register('name', {
                  required: 'El nombre del hotel es obligatorio',
                  minLength: {
                    value: 3,
                    message: 'El nombre debe tener al menos 3 caracteres',
                  },
                  maxLength: {
                    value: 100,
                    message: 'El nombre no puede exceder los 100 caracteres',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9\s\-_]+$/,
                    message: 'El nombre solo puede contener letras, números, espacios, guiones y guiones bajos',
                  },
                })}
                placeholder="Ingrese el nombre del hotel"
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl isRequired isInvalid={errors.direction}>
              <FormLabel>Dirección</FormLabel>
              <Textarea
                {...register('direction', {
                  required: 'La dirección del hotel es obligatoria',
                  minLength: {
                    value: 10,
                    message: 'La dirección debe tener al menos 10 caracteres',
                  },
                  maxLength: {
                    value: 200,
                    message: 'La dirección no puede exceder los 200 caracteres',
                  },
                })}
                placeholder="Ingrese la dirección completa del hotel"
              />
              <FormErrorMessage>
                {errors.direction && errors.direction.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isRequired isInvalid={errors.category}>
              <FormLabel>Categoría</FormLabel>
              <Select
                {...register('category', {
                  required: 'Debe seleccionar una categoría para el hotel',
                })}
              >
                <option value="">Selecciona una categoría</option>
                <option value="1 Estrella">1 Estrella</option>
                <option value="2 Estrellas">2 Estrellas</option>
                <option value="3 Estrellas">3 Estrellas</option>
                <option value="4 Estrellas">4 Estrellas</option>
                <option value="5 Estrellas">5 Estrellas</option>
              </Select>
              <FormErrorMessage>
                {errors.category && errors.category.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={errors.rangeOfPrices?.min || errors.rangeOfPrices?.max}>
              <FormLabel>Rango de Precios</FormLabel>
              <HStack>
                <Input
                  type="number"
                  placeholder="Precio mínimo"
                  {...register('rangeOfPrices.min', {
                    min: {
                      value: 0,
                      message: 'El precio mínimo no puede ser negativo',
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Solo se permiten números enteros',
                    },
                  })}
                />
                <Input
                  type="number"
                  placeholder="Precio máximo"
                  {...register('rangeOfPrices.max', {
                    min: {
                      value: 0,
                      message: 'El precio máximo no puede ser negativo',
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Solo se permiten números enteros',
                    },
                    validate: (value) => {
                      if (minPrice && value && Number(value) <= Number(minPrice)) {
                        return 'El precio máximo debe ser mayor que el mínimo';
                      }
                      return true;
                    },
                  })}
                />
              </HStack>
              <FormErrorMessage>
                {errors.rangeOfPrices?.min?.message || errors.rangeOfPrices?.max?.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl isRequired isInvalid={!selectedAdmin}>
              <FormLabel>Administrador</FormLabel>
              <AdminSearch
                onSelect={setSelectedAdmin}
                selectedAdmin={selectedAdmin}
              />
              <FormErrorMessage>
                {!selectedAdmin && 'Debe seleccionar un administrador para el hotel'}
              </FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl isInvalid={errors.facilities}>
              <FormLabel>Instalaciones</FormLabel>
              <SimpleGrid columns={[2, 3]} spacing={2}>
                <Checkbox {...register('facilities')} value="Wifi">Wifi</Checkbox>
                <Checkbox {...register('facilities')} value="Piscina">Piscina</Checkbox>
                <Checkbox {...register('facilities')} value="Estacionamiento">Estacionamiento</Checkbox>
                <Checkbox {...register('facilities')} value="Habitaciones Privadas">Habitaciones Privadas</Checkbox>
                <Checkbox {...register('facilities')} value="Servicios Premium">Servicios Premium</Checkbox>
              </SimpleGrid>
              <FormErrorMessage>
                {errors.facilities && errors.facilities.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl isInvalid={errors.services}>
              <FormLabel>Servicios</FormLabel>
              <SimpleGrid columns={[2, 3]} spacing={2}>
                <Checkbox {...register('services')} value="Desayuno">Desayuno</Checkbox>
                <Checkbox {...register('services')} value="Gimnasio">Gimnasio</Checkbox>
                <Checkbox {...register('services')} value="Spa">Spa</Checkbox>
                <Checkbox {...register('services')} value="Room Service">Room Service</Checkbox>
                <Checkbox {...register('services')} value="Lavandería">Lavandería</Checkbox>
                <Checkbox {...register('services')} value="Servicio de Concierge">Servicio de Concierge</Checkbox>
              </SimpleGrid>
              <FormErrorMessage>
                {errors.services && errors.services.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl isRequired isInvalid={existingImages.length + newImages.length === 0}>
              <FormLabel>Imágenes</FormLabel>
              <VStack spacing={4} align="stretch">
                <Box>
                  <Input
                    type="file"
                    accept="image/*"
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
              <FormErrorMessage>
                {existingImages.length + newImages.length === 0 && 'Debe agregar al menos una imagen del hotel'}
              </FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <Button 
              colorScheme="teal" 
              type="submit" 
              w="full"
              isDisabled={Object.keys(errors).length > 0 || !selectedAdmin || existingImages.length + newImages.length === 0}
            >
              {isEdit ? 'Actualizar Hotel' : 'Crear Hotel'}
            </Button>
          </GridItem>
        </Grid>
      </Box>
    );
  };

HotelForm.propTypes = {
  hotelData: PropTypes.shape({
    name: PropTypes.string,
    direction: PropTypes.string,
    category: PropTypes.string,
    rangeOfPrices: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number
    }),
    facilities: PropTypes.arrayOf(PropTypes.string),
    services: PropTypes.arrayOf(PropTypes.string),
    images: PropTypes.arrayOf(PropTypes.string)
  }),
  onSuccess: PropTypes.func
};
  
export default HotelForm;
  