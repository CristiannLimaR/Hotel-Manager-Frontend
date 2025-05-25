import { 
  Box, 
  Image, 
  Heading, 
  Text, 
  Button, 
  Badge, 
  Flex, 
  Icon, 
  VStack, 
  HStack,
  useColorModeValue 
} from '@chakra-ui/react'
import { FiUsers, FiClock, FiMapPin, FiCheck } from 'react-icons/fi'
import { Link as RouterLink } from 'react-router-dom'
import { hotels } from '../../data/hotels'

function EventCard({ event }) {
  const { 
    id, 
    title, 
    description, 
    image, 
    type, 
    capacity, 
    price, 
    duration, 
    includes,
    hotelId 
  } = event
  
  const hotel = hotels.find(h => h.id === hotelId)
  
  const cardBg = useColorModeValue('white', 'gray.800')
  const badgeBg = useColorModeValue('brand.500', 'brand.400')
  
  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      overflow="hidden" 
      bg={cardBg}
      boxShadow="md"
      transition="all 0.3s"
      _hover={{ 
        transform: 'translateY(-4px)',
        boxShadow: 'lg'
      }}
    >
      <Box position="relative">
        <Image 
          src={image} 
          alt={title} 
          h="200px" 
          w="100%" 
          objectFit="cover" 
        />
        <Badge
          position="absolute"
          top={4}
          right={4}
          px={3}
          py={1}
          bg={badgeBg}
          color="white"
          borderRadius="full"
          fontSize="sm"
        >
          {type}
        </Badge>
      </Box>
      
      <Box p={6}>
        <Heading 
          as="h3" 
          fontSize="xl" 
          mb={2}
          noOfLines={1}
        >
          {title}
        </Heading>
        
        <Text 
          color="gray.600" 
          fontSize="sm" 
          mb={4}
          noOfLines={2}
        >
          {description}
        </Text>
        
        <VStack spacing={3} align="stretch" mb={4}>
          <Flex align="center">
            <Icon as={FiMapPin} color="gray.500" mr={2} />
            <Text fontSize="sm">{hotel?.name}, {hotel?.location}</Text>
          </Flex>
          
          <Flex align="center">
            <Icon as={FiUsers} color="gray.500" mr={2} />
            <Text fontSize="sm">Hasta {capacity} invitados</Text>
          </Flex>
          
          <Flex align="center">
            <Icon as={FiClock} color="gray.500" mr={2} />
            <Text fontSize="sm">{duration}</Text>
          </Flex>
        </VStack>
        
        <Box mb={4}>
          <Text fontWeight="medium" mb={2}>
            El Paquete Incluye:
          </Text>
          <VStack align="start" spacing={1}>
            {includes.slice(0, 3).map((item, index) => (
              <Flex key={index} align="center">
                <Icon as={FiCheck} color="green.500" mr={2} boxSize={3} />
                <Text fontSize="sm">{item}</Text>
              </Flex>
            ))}
            {includes.length > 3 && (
              <Text fontSize="sm" color="brand.500">
                +{includes.length - 3} inclusiones más
              </Text>
            )}
          </VStack>
        </Box>
        
        <Flex 
          justify="space-between" 
          align="center" 
          mt={4}
          pt={4}
          borderTopWidth={1}
        >
          <Box>
            <Text fontSize="sm" color="gray.500">
              Desde
            </Text>
            <Text fontSize="xl" fontWeight="bold" color="brand.500">
              ${price.toLocaleString()}
            </Text>
          </Box>
          
          <Button
            as={RouterLink}
            to={`/events/${id}`}
            colorScheme="teal"
            size="sm"
          >
            Ver Más
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}

export default EventCard