import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Heading, 
  Flex, 
  Spacer, 
  useToast, 
  Spinner, 
  Center,
} from '@chakra-ui/react';
import ServiceForm from './ServiceForm';
import ServicesList from './ServicesList';
import { getServices } from '../../../services/api';

const ServicesContent = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  const normalizeServicesData = (response) => {
    if (response.services) return response.services;
    if (response.data) return response.data;
    if (Array.isArray(response)) return response;
    return [];
  };

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getServices();
      
      if (response?.error) {
        throw new Error(response.message || 'Error al obtener servicios');
      }

      setServices(normalizeServicesData(response));
      
    } catch (error) {
      console.error('Error fetching services:', error);
      setError(error.message);
      setServices([]);
      
      toast({
        title: 'Error al cargar servicios',
        description: error.message || 'No se pudieron cargar los servicios.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

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
        <ServiceForm refreshServices={fetchServices} />
      </Flex>
      
      <ServicesList 
        services={services} 
        refreshServices={fetchServices} 
      />
    </Box>
  );
};

export default ServicesContent;