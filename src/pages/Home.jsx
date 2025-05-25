import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Button, 
  SimpleGrid, 
  Flex, 
  Badge, 
  Input,
  useBreakpointValue
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import SearchBar from '../components/common/SearchBar'
import HotelCard from '../components/hotels/HotelCard'
import TestimonialCard from '../components/testimonials/TestimonialCard'
import { testimonials } from '../data/testimonials'
import { useState, useEffect } from 'react'
import  useHotel  from '../shared/hooks/useHotel'
function Home() {
  const heroImageHeight = useBreakpointValue({ base: '500px', md: '600px', lg: '650px' })
  const heroTextWidth = useBreakpointValue({ base: '100%', md: '80%', lg: '60%' })
  const { getHotels } = useHotel()
  const [hotels, setHotels] = useState([])

  useEffect(() => {
    const fetchHotels = async () => {
      const response = await getHotels()
      setHotels(response)
    }
    fetchHotels()
  }, [])

  const featuredHotels = hotels.slice(0, 4)
  
  
  return (
    <Box>
      <Box 
        position="relative" 
        h={heroImageHeight} 
        bgImage="url('https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920')"
        bgPosition="center"
        bgSize="cover"
        bgRepeat="no-repeat"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bg: 'rgba(0, 0, 0, 0.5)',
          zIndex: 0
        }}
      >
        <Container 
          maxW="1200px" 
          h="100%" 
          position="relative" 
          zIndex={1}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Badge 
            alignSelf="flex-start" 
            px={3} 
            py={1} 
            bg="brand.500" 
            color="white" 
            fontWeight="medium" 
            fontSize="sm" 
            borderRadius="full"
            mb={4}
          >
            La Mejor Experiencia Hotelera
          </Badge>
          
          <Box maxW={heroTextWidth}>
            <Heading 
              as="h1" 
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} 
              color="white" 
              fontWeight="bold"
              lineHeight="1.2"
              mb={4}
            >
              Descubre Tu Destino Perfecto
            </Heading>
            
            <Text 
              fontSize={{ base: 'md', md: 'lg' }} 
              color="white" 
              mb={6}
            >
              Lujo y confort sin igual te esperan en los hoteles y resorts más exclusivos del mundo. Comienza tu viaje hoy.
            </Text>
          </Box>
          
          <Box 
            bg="white" 
            p={5} 
            borderRadius="lg" 
            boxShadow="md" 
            mt={4}
            maxW={{ base: '100%', lg: '90%' }}
          >
            <SearchBar />
          </Box>
        </Container>
      </Box>

      <Box py={16} bg="gray.50">
        <Container maxW="1200px">
          <Heading 
            as="h2" 
            fontSize={{ base: '2xl', md: '3xl' }} 
            mb={3} 
            textAlign="center"
          >
            Destinos Destacados
          </Heading>
          
          <Text 
            textAlign="center" 
            fontSize="md" 
            color="gray.600" 
            maxW="800px" 
            mx="auto" 
            mb={12}
          >
            Descubre nuestra selección de propiedades excepcionales alrededor del mundo, ofreciendo lujo sin igual y experiencias inolvidables.
          </Text>
          
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            {featuredHotels.map((hotel) => (
              <HotelCard key={hotel.uid} hotel={hotel} />
            ))}
          </SimpleGrid>
          
          <Flex justify="center" mt={10}>
            <Button 
              as={RouterLink} 
              to="/hotels"
              rightIcon={<FiArrowRight />} 
              variant="outline" 
              colorScheme="teal"
            >
              Ver Todos los Destinos
            </Button>
          </Flex>
        </Container>
      </Box>
      
      
      
      <Box py={16} bg="gray.50">
        <Container maxW="1200px">
          <Heading 
            as="h2" 
            fontSize={{ base: '2xl', md: '3xl' }} 
            mb={3} 
            textAlign="center"
          >
            Lo Que Dicen Nuestros Huéspedes
          </Heading>
          
          <Text 
            textAlign="center" 
            fontSize="md" 
            color="gray.600" 
            maxW="800px" 
            mx="auto" 
            mb={12}
          >
            Descubre por qué los viajeros más exigentes eligen QuickStay para sus alojamientos exclusivos y lujosos alrededor del mundo.
          </Text>
          
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </SimpleGrid>
        </Container>
      </Box>
      
      <Box py={16} bg="navy.900" color="white">
        <Container maxW="1200px">
          <Box 
            textAlign="center" 
            maxW="800px" 
            mx="auto"
          >
            <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }} mb={6}>
              Mantente Inspirado
            </Heading>
            
            <Text fontSize="md" mb={8}>
              Únete a nuestro boletín y sé el primero en descubrir nuevos destinos, ofertas exclusivas e inspiración para viajar.
            </Text>
            
            <Flex 
              maxW="500px" 
              mx="auto" 
              flexDirection={{ base: 'column', md: 'row' }}
            >
              <Input 
                placeholder="Ingresa tu correo electrónico" 
                bg="white" 
                color="gray.800" 
                _placeholder={{ color: 'gray.500' }}
                mb={{ base: 4, md: 0 }}
                mr={{ md: 3 }}
                size="lg"
              />
              <Button 
                bg="brand.500" 
                _hover={{ bg: 'brand.600' }} 
                size="lg"
                minW={{ md: '150px' }}
              >
                Suscribirse
              </Button>
            </Flex>
            
            <Text fontSize="xs" color="gray.400" mt={4}>
              Al suscribirte, aceptas nuestra Política de Privacidad y consientes recibir actualizaciones.
            </Text>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Home