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
import OfferCard from '../components/offers/OfferCard'
import TestimonialCard from '../components/testimonials/TestimonialCard'
import { hotels } from '../data/hotels'
import { offers } from '../data/offers'
import { testimonials } from '../data/testimonials'
import useAuthStore from '../shared/stores/authStore'
function Home() {
  const heroImageHeight = useBreakpointValue({ base: '500px', md: '600px', lg: '650px' })
  const heroTextWidth = useBreakpointValue({ base: '100%', md: '80%', lg: '60%' })
  const user = useAuthStore((state) => state.user)
  console.log(user)
  
  const featuredHotels = hotels.filter(hotel => hotel.featured).slice(0, 4)
  
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
            The Ultimate Hotel Experience
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
              Discover Your Perfect Gateway Destination
            </Heading>
            
            <Text 
              fontSize={{ base: 'md', md: 'lg' }} 
              color="white" 
              mb={6}
            >
              Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts. Begin your journey today.
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
            Featured Destination
          </Heading>
          
          <Text 
            textAlign="center" 
            fontSize="md" 
            color="gray.600" 
            maxW="800px" 
            mx="auto" 
            mb={12}
          >
            Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences.
          </Text>
          
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            {featuredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
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
              View All Destinations
            </Button>
          </Flex>
        </Container>
      </Box>
      
      <Box py={16}>
        <Container maxW="1200px">
          <Flex 
            justifyContent="space-between" 
            alignItems="center" 
            mb={12}
            flexDirection={{ base: 'column', md: 'row' }}
            textAlign={{ base: 'center', md: 'left' }}
          >
            <Box mb={{ base: 6, md: 0 }}>
              <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }} mb={3}>
                Exclusive Offers
              </Heading>
              <Text color="gray.600" maxW="600px">
                Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
              </Text>
            </Box>
            
            <Button 
              as={RouterLink} 
              to="/offers"
              rightIcon={<FiArrowRight />} 
              colorScheme="teal" 
              variant="outline"
            >
              View All Offers
            </Button>
          </Flex>
          
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {offers.slice(0, 3).map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </SimpleGrid>
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
            What Our Guests Say
          </Heading>
          
          <Text 
            textAlign="center" 
            fontSize="md" 
            color="gray.600" 
            maxW="800px" 
            mx="auto" 
            mb={12}
          >
            Discover why discerning travelers consistently choose QuickStay for their exclusive and luxurious accommodations around the world.
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
              Stay Inspired
            </Heading>
            
            <Text fontSize="md" mb={8}>
              Join our newsletter and be the first to discover new destinations, exclusive offers, and travel inspiration.
            </Text>
            
            <Flex 
              maxW="500px" 
              mx="auto" 
              flexDirection={{ base: 'column', md: 'row' }}
            >
              <Input 
                placeholder="Enter your email" 
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
                Subscribe
              </Button>
            </Flex>
            
            <Text fontSize="xs" color="gray.400" mt={4}>
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </Text>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Home