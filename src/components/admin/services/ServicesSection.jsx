import { Box, Heading, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import ServiceForm from './ServiceForm';
import ServicesList from './ServicesList';
import { getServices } from '../../../services/api';

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const response = await getServices();
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <Box p={4}>
      <VStack align="stretch" spacing={6}>
        <ServiceForm refreshServices={fetchServices} />
        <ServicesList services={services} refreshServices={fetchServices} />
      </VStack>
    </Box>
  );
};

export default ServicesSection;