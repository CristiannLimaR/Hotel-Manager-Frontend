import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Stack,
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
    Text,
  } from '@chakra-ui/react';
  import { useForm } from 'react-hook-form';
  import { useState, useEffect } from 'react';
  import { FiPlus, FiX } from 'react-icons/fi';
  
  export default function HotelForm({ hotelData = null, onSuccess }) {
    const isEdit = Boolean(hotelData);
    const toast = useToast();
  
    const { register, handleSubmit, setValue, reset } = useForm();
  
    const [existingImages, setExistingImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
  
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
      }
    }, [hotelData, reset]);

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
  
        data.facilities?.forEach((f) => formData.append('facilities', f));
        data.services?.forEach((s) => formData.append('services', s));
        existingImages.forEach((url) => formData.append('existingImages', url));
        newImages.forEach((file) => formData.append('images', file));
  
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
            <FormControl isRequired>
              <FormLabel>Nombre</FormLabel>
              <Input {...register('name')} />
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl isRequired>
              <FormLabel>Dirección</FormLabel>
              <Textarea {...register('direction')} />
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isRequired>
              <FormLabel>Categoría</FormLabel>
              <Select {...register('category')}>
                <option value="">Selecciona una categoría</option>
                <option value="1 Estrella">1 Estrella</option>
                <option value="2 Estrellas">2 Estrellas</option>
                <option value="3 Estrellas">3 Estrellas</option>
                <option value="4 Estrellas">4 Estrellas</option>
                <option value="5 Estrellas">5 Estrellas</option>
              </Select>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl>
              <FormLabel>Rango de Precios</FormLabel>
              <HStack>
                <Input type="number" placeholder="Mínimo" {...register('rangeOfPrices.min')} />
                <Input type="number" placeholder="Máximo" {...register('rangeOfPrices.max')} />
              </HStack>
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Instalaciones</FormLabel>
              <SimpleGrid columns={[2, 3]} spacing={2}>
                <Checkbox {...register('facilities')} value="Wifi">Wifi</Checkbox>
                <Checkbox {...register('facilities')} value="Piscina">Piscina</Checkbox>
                <Checkbox {...register('facilities')} value="Estacionamiento">Estacionamiento</Checkbox>
                <Checkbox {...register('facilities')} value="Access to private escorts room">Acceso a habitaciones privadas</Checkbox>
                <Checkbox {...register('facilities')} value="Premium escorts unlimited">Servicios premium ilimitados</Checkbox>
              </SimpleGrid>
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Servicios</FormLabel>
              <SimpleGrid columns={[2, 3]} spacing={2}>
                <Checkbox {...register('services')} value="Desayuno">Desayuno</Checkbox>
                <Checkbox {...register('services')} value="Gimnasio">Gimnasio</Checkbox>
                <Checkbox {...register('services')} value="Spa">Spa</Checkbox>
              </SimpleGrid>
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl>
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
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <Button colorScheme="teal" type="submit" w="full">
              {isEdit ? 'Actualizar Hotel' : 'Crear Hotel'}
            </Button>
          </GridItem>
        </Grid>
      </Box>
    );
  }
  