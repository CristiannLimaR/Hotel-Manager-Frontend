import { useState, useEffect } from 'react';
import { 
  Box, 
  Flex, 
  Spacer, 
  useToast, 
  Spinner, 
  Center,
} from '@chakra-ui/react';
import ServiceForm from './ServiceForm';
import ServicesList from './ServicesList';
import useHotel from '../../../shared/hooks/useHotel';

const ServicesContent = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const { getHotelsByAdmin } = useHotel();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const hotelData = await getHotelsByAdmin();
        console.log('Hotel cargado:', hotelData);
        setHotel(hotelData);
        // Actualizar los servicios directamente del hotel
        if (hotelData?.services) {
          setServices(hotelData.services);
        } else {
          setServices([]);
        }
      } catch (error) {
        console.error('Error al cargar el hotel:', error);
        toast({
          title: "Error",
          description: "No se pudo cargar la información del hotel",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchHotel();
  }, []);

  const refreshServices = async () => {
    try {
      setLoading(true);
      const hotelData = await getHotelsByAdmin();
      setHotel(hotelData);
      if (hotelData?.services) {
        setServices(hotelData.services);
      } else {
        setServices([]);
      }
    } catch (error) {
      console.error('Error al actualizar servicios:', error);
      toast({
        title: 'Error al actualizar servicios',
        description: error.message || 'No se pudieron actualizar los servicios.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box p={5}>
        <Center py={10}>
          <Spinner size="xl" />
        </Center>
      </Box>
    );
  }

  return (
    <Box p={5}>
      <Flex mb={4} alignItems="center">
        <Spacer />
        <ServiceForm refreshServices={refreshServices} hotelId={hotel?.uid} />
      </Flex>
      
      <ServicesList 
        services={services} 
        refreshServices={refreshServices} 
      />
    </Box>
  );
};

export default ServicesContent;