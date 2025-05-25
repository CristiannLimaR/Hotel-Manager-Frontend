import { useState, useEffect } from 'react'
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  SimpleGrid, 
  Flex, 
  Button, 
  Stack, 
  Badge,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useColorModeValue,
  Divider,
  List,
  ListItem,
  ListIcon
} from '@chakra-ui/react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiMapPin, FiUsers, FiDollarSign, FiCheck } from 'react-icons/fi'
import useHotel from '../shared/hooks/useHotel'

function HotelDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getHotelById  } = useHotel()
  const [hotel, setHotel] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [showAllImages, setShowAllImages] = useState(false)
  console.log(id)
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await getHotelById(id)
        setHotel(response)
      } catch (error) {
        console.error('Error al cargar el hotel:', error)
      }
    }
    fetchHotel()
  }, [id])
  
  if (!hotel) {
    return (
      <Box pt={20} pb={16}>
        <Container maxW="1200px">
          <Text>Cargando...</Text>
        </Container>
      </Box>
    )
  }
  
  const displayedImages = showAllImages ? hotel.images : hotel.images.slice(0, 5)
  const remainingImages = hotel.images.length - 5
  
  const handleRoomSelect = (room) => {
    navigate(`/booking/${hotel.uid}/${room._id}`)
  }
  
  return (
    <Box pt={20} pb={16}>
      <Container maxW="1200px">
        {/* Hotel Header */}
        <Box mb={8}>
          <Heading as="h1" fontSize={{ base: '2xl', md: '3xl' }} mb={2}>
            {hotel.name}
          </Heading>
          <Flex align="center" gap={2} mb={4}>
            <Badge colorScheme="teal" fontSize="sm">
              {hotel.category}
            </Badge>
            <Text color="gray.600" fontSize="sm">
              <FiMapPin style={{ display: 'inline', marginRight: '4px' }} />
              {hotel.direction}
            </Text>
          </Flex>
        </Box>
        
        {/* Image Gallery */}
        <Box mb={8}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            {displayedImages.map((image, index) => (
              <Box 
                key={index} 
                position="relative" 
                borderRadius="lg" 
                overflow="hidden"
                cursor="pointer"
                onClick={onOpen}
              >
                <Image 
                  src={image} 
                  alt={`${hotel.name} - Imagen ${index + 1}`}
                  w="full"
                  h="250px"
                  objectFit="cover"
                />
              </Box>
            ))}
            {!showAllImages && remainingImages > 0 && (
              <Box 
                position="relative" 
                borderRadius="lg" 
                overflow="hidden"
                cursor="pointer"
                onClick={() => setShowAllImages(true)}
              >
                <Box
                  position="absolute"
                  inset={0}
                  bg="blackAlpha.600"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="white"
                >
                  <Text fontSize="xl" fontWeight="bold">
                    +{remainingImages} más
                  </Text>
                </Box>
                <Image 
                  src={hotel.images[5]} 
                  alt="Ver más imágenes"
                  w="full"
                  h="250px"
                  objectFit="cover"
                />
              </Box>
            )}
          </SimpleGrid>
        </Box>
        
        {/* Hotel Information */}
        <Flex 
          direction={{ base: 'column', lg: 'row' }} 
          gap={8}
        >
          {/* Main Content */}
          <Box flex="1">
            {/* Facilities */}
            <Box 
              p={6} 
              bg={bgColor} 
              borderRadius="lg" 
              borderWidth="1px"
              borderColor={borderColor}
              mb={6}
            >
              <Heading as="h3" fontSize="xl" mb={4}>
                Instalaciones
              </Heading>
              <List spacing={3}>
                {hotel.facilities.map((facility, index) => (
                  <ListItem key={index}>
                    <ListIcon as={FiCheck} color="teal.500" />
                    {facility}
                  </ListItem>
                ))}
              </List>
            </Box>
            
            {/* Rooms */}
            <Box 
              p={6} 
              bg={bgColor} 
              borderRadius="lg" 
              borderWidth="1px"
              borderColor={borderColor}
            >
              <Heading as="h3" fontSize="xl" mb={4}>
                Habitaciones Disponibles
              </Heading>
              <Stack spacing={4}>
                {hotel.rooms.map(room => (
                  <Box 
                    key={room._id}
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor={borderColor}
                  >
                    <Flex justify="space-between" align="center" mb={2}>
                      <Heading as="h4" fontSize="lg">
                        {room.type}
                      </Heading>
                      <Badge colorScheme="green">
                        Disponible
                      </Badge>
                    </Flex>
                    <Stack spacing={2} mb={4}>
                      <Flex align="center" gap={2}>
                        <FiUsers />
                        <Text>Capacidad: {room.capacity} personas</Text>
                      </Flex>
                      <Flex align="center" gap={2}>
                        <FiDollarSign />
                        <Text>Precio por noche: ${room.price_per_night}</Text>
                      </Flex>
                    </Stack>
                    <Button 
                      colorScheme="teal" 
                      onClick={() => handleRoomSelect(room)}
                    >
                      Reservar
                    </Button>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>
          
          {/* Sidebar */}
          <Box w={{ base: 'full', lg: '300px' }} flexShrink={0}>
            <Box 
              p={6} 
              bg={bgColor} 
              borderRadius="lg" 
              borderWidth="1px"
              borderColor={borderColor}
              position="sticky"
              top="100px"
            >
              <Stack spacing={4}>
                <Box>
                  <Text fontWeight="medium" mb={1}>
                    Precio por noche
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" color="teal.500">
                    ${hotel.rangeOfPrices.min} - ${hotel.rangeOfPrices.max}
                  </Text>
                </Box>
                <Divider />
                <Box>
                  <Text fontWeight="medium" mb={1}>
                    Habitaciones
                  </Text>
                  <Text>
                    Disponibles: {hotel.availableRooms}
                  </Text>
                  <Text>
                    Ocupadas: {hotel.busyRooms}
                  </Text>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Flex>
      </Container>
      
      {/* Image Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={0}>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} p={4}>
              {hotel.images.map((image, index) => (
                <Box 
                  key={index} 
                  borderRadius="lg" 
                  overflow="hidden"
                >
                  <Image 
                    src={image} 
                    alt={`${hotel.name} - Imagen ${index + 1}`}
                    w="full"
                    h="300px"
                    objectFit="cover"
                  />
                </Box>
              ))}
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default HotelDetail