import { useState } from 'react'
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Flex, 
  Button, 
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel, 
  Badge, 
  Image, 
  Grid, 
  GridItem, 
  VStack, 
  HStack, 
  Icon, 
  Divider, 
  useDisclosure, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalFooter, 
  ModalBody, 
  ModalCloseButton,
  useToast
} from '@chakra-ui/react'
import { 
  FiCalendar, 
  FiMapPin, 
  FiCheckCircle, 
  FiClock, 
  FiUserCheck, 
  FiDownload, 
  FiEdit, 
  FiXCircle 
} from 'react-icons/fi'
import { Link as RouterLink } from 'react-router-dom'
import { hotels } from '../data/hotels'

// Sample booking data
const mockBookings = [
  {
    id: 1,
    hotelId: 1,
    roomType: 'Deluxe King Suite',
    checkIn: '2025-06-15',
    checkOut: '2025-06-18',
    guests: 2,
    status: 'upcoming',
    bookingDate: '2025-05-01',
    totalAmount: 897,
    paymentMethod: 'Credit Card',
    confirmationNumber: 'BK87652341'
  },
  {
    id: 2,
    hotelId: 3,
    roomType: 'Premium Ocean View',
    checkIn: '2025-07-10',
    checkOut: '2025-07-15',
    guests: 2,
    status: 'upcoming',
    bookingDate: '2025-05-03',
    totalAmount: 1450,
    paymentMethod: 'PayPal',
    confirmationNumber: 'BK45219873'
  },
  {
    id: 3,
    hotelId: 4,
    roomType: 'Executive Suite',
    checkIn: '2025-04-05',
    checkOut: '2025-04-08',
    guests: 2,
    status: 'completed',
    bookingDate: '2025-03-01',
    totalAmount: 935,
    paymentMethod: 'Credit Card',
    confirmationNumber: 'BK32654987'
  },
  {
    id: 4,
    hotelId: 2,
    roomType: 'Deluxe Twin Room',
    checkIn: '2025-02-20',
    checkOut: '2025-02-22',
    guests: 2,
    status: 'cancelled',
    bookingDate: '2025-01-15',
    totalAmount: 562,
    paymentMethod: 'Credit Card',
    confirmationNumber: 'BK98763421',
    cancellationDate: '2025-02-01'
  }
]

function BookingCard({ booking }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  
  // Find hotel data
  const hotel = hotels.find(h => h.id === booking.hotelId) || hotels[0]
  
  // Calculate nights
  const checkIn = new Date(booking.checkIn)
  const checkOut = new Date(booking.checkOut)
  const nights = Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24))
  
  // Format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }
  
  // Get status badge
  const getStatusBadge = () => {
    switch(booking.status) {
      case 'upcoming':
        return <Badge colorScheme="green">Upcoming</Badge>
      case 'completed':
        return <Badge colorScheme="blue">Completed</Badge>
      case 'cancelled':
        return <Badge colorScheme="red">Cancelled</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }
  
  // Handle booking cancellation
  const [isCancelling, setIsCancelling] = useState(false)
  
  const handleCancelBooking = () => {
    setIsCancelling(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsCancelling(false)
      onClose()
      
      toast({
        title: 'Booking Cancelled',
        description: `Your booking at ${hotel.name} has been cancelled successfully.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }, 1500)
  }
  
  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      overflow="hidden" 
      boxShadow="sm"
      transition="transform 0.3s, box-shadow 0.3s"
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: 'md'
      }}
    >
      <Grid templateColumns={{ base: '1fr', md: '250px 1fr' }}>
        <GridItem>
          <Image 
            src={hotel.image} 
            alt={hotel.name} 
            h="100%" 
            w="100%" 
            objectFit="cover" 
          />
        </GridItem>
        
        <GridItem p={5}>
          <Flex 
            justify="space-between" 
            align={{ base: 'flex-start', md: 'center' }}
            flexDirection={{ base: 'column', md: 'row' }}
            mb={3}
          >
            <Box>
              <Heading as="h3" fontSize="lg" mb={1}>
                {hotel.name}
              </Heading>
              
              <Flex align="center" mb={2}>
                <Icon as={FiMapPin} color="gray.500" mr={1} />
                <Text fontSize="sm" color="gray.600">
                  {hotel.location}
                </Text>
              </Flex>
            </Box>
            
            {getStatusBadge()}
          </Flex>
          
          <Divider my={3} />
          
          <Grid 
            templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
            gap={4}
            mb={4}
          >
            <VStack align="flex-start" spacing={1}>
              <Text fontWeight="medium" fontSize="sm" color="gray.500">
                Room Type
              </Text>
              <Text fontWeight="medium">
                {booking.roomType}
              </Text>
            </VStack>
            
            <VStack align="flex-start" spacing={1}>
              <HStack>
                <Icon as={FiCalendar} color="gray.500" size="sm" />
                <Text fontWeight="medium" fontSize="sm" color="gray.500">
                  Check-in
                </Text>
              </HStack>
              <Text fontWeight="medium">
                {formatDate(booking.checkIn)}
              </Text>
            </VStack>
            
            <VStack align="flex-start" spacing={1}>
              <HStack>
                <Icon as={FiCalendar} color="gray.500" size="sm" />
                <Text fontWeight="medium" fontSize="sm" color="gray.500">
                  Check-out
                </Text>
              </HStack>
              <Text fontWeight="medium">
                {formatDate(booking.checkOut)}
              </Text>
            </VStack>
          </Grid>
          
          <HStack spacing={3} mt={2} wrap="wrap">
            <Flex align="center">
              <Icon as={FiClock} color="gray.500" mr={2} />
              <Text fontSize="sm">
                {nights} {nights === 1 ? 'night' : 'nights'}
              </Text>
            </Flex>
            
            <Flex align="center">
              <Icon as={FiUserCheck} color="gray.500" mr={2} />
              <Text fontSize="sm">
                {booking.guests} Guests
              </Text>
            </Flex>
            
            <Flex align="center">
              <Icon as={FiCheckCircle} color="gray.500" mr={2} />
              <Text fontSize="sm">
                Conf #{booking.confirmationNumber}
              </Text>
            </Flex>
          </HStack>
          
          <Divider my={3} />
          
          <Flex 
            justify="space-between" 
            align={{ base: 'flex-start', md: 'center' }}
            flexDirection={{ base: 'column', md: 'row' }}
          >
            <Text fontWeight="bold">
              Total: ${booking.totalAmount}
            </Text>
            
            <HStack spacing={3} mt={{ base: 3, md: 0 }}>
              <Button 
                size="sm" 
                leftIcon={<FiDownload />} 
                variant="outline"
              >
                Receipt
              </Button>
              
              {booking.status === 'upcoming' && (
                <>
                  <Button 
                    as={RouterLink} 
                    to={`/hotels/${hotel.id}`}
                    size="sm" 
                    leftIcon={<FiEdit />} 
                    variant="outline" 
                    colorScheme="teal"
                  >
                    Modify
                  </Button>
                  
                  <Button 
                    size="sm" 
                    leftIcon={<FiXCircle />} 
                    colorScheme="red" 
                    variant="outline"
                    onClick={onOpen}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </HStack>
          </Flex>
        </GridItem>
      </Grid>
      
      {/* Cancellation Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cancel Booking</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to cancel your booking at <b>{hotel.name}</b> for <b>{formatDate(booking.checkIn)}</b>?
            </Text>
            {checkIn <= new Date() && (
              <Text mt={4} color="red.500">
                Please note that this booking is within the 24-hour cancellation window and may be subject to charges.
              </Text>
            )}
          </ModalBody>
          
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Keep Booking
            </Button>
            <Button 
              colorScheme="red" 
              onClick={handleCancelBooking}
              isLoading={isCancelling}
              loadingText="Cancelling"
            >
              Yes, Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

function MyBookings() {
  const upcomingBookings = mockBookings.filter(booking => booking.status === 'upcoming')
  const completedBookings = mockBookings.filter(booking => booking.status === 'completed')
  const cancelledBookings = mockBookings.filter(booking => booking.status === 'cancelled')
  
  return (
    <Box pt={24} pb={16}>
      <Container maxW="1200px">
        <Heading as="h1" fontSize={{ base: '2xl', md: '3xl' }} mb={2}>
          My Bookings
        </Heading>
        
        <Text color="gray.600" mb={8}>
          Manage your upcoming stays and review your past bookings
        </Text>
        
        <Tabs colorScheme="teal" isLazy>
          <TabList mb={6}>
            <Tab fontWeight="medium">Upcoming ({upcomingBookings.length})</Tab>
            <Tab fontWeight="medium">Completed ({completedBookings.length})</Tab>
            <Tab fontWeight="medium">Cancelled ({cancelledBookings.length})</Tab>
          </TabList>
          
          <TabPanels>
            {/* Upcoming Bookings */}
            <TabPanel px={0}>
              {upcomingBookings.length === 0 ? (
                <Box textAlign="center" py={10}>
                  <Heading as="h3" fontSize="lg" mb={4}>
                    No upcoming bookings
                  </Heading>
                  <Text color="gray.600" mb={6}>
                    You don't have any upcoming hotel stays. Ready to plan your next trip?
                  </Text>
                  <Button 
                    as={RouterLink} 
                    to="/hotels"
                    colorScheme="teal"
                  >
                    Find Hotels
                  </Button>
                </Box>
              ) : (
                <VStack spacing={6} align="stretch">
                  {upcomingBookings.map(booking => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </VStack>
              )}
            </TabPanel>
            
            {/* Completed Bookings */}
            <TabPanel px={0}>
              {completedBookings.length === 0 ? (
                <Box textAlign="center" py={10}>
                  <Heading as="h3" fontSize="lg" mb={4}>
                    No completed bookings
                  </Heading>
                  <Text color="gray.600" mb={6}>
                    You don't have any completed stays yet.
                  </Text>
                  <Button 
                    as={RouterLink} 
                    to="/hotels"
                    colorScheme="teal"
                  >
                    Find Hotels
                  </Button>
                </Box>
              ) : (
                <VStack spacing={6} align="stretch">
                  {completedBookings.map(booking => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </VStack>
              )}
            </TabPanel>
            
            {/* Cancelled Bookings */}
            <TabPanel px={0}>
              {cancelledBookings.length === 0 ? (
                <Box textAlign="center" py={10}>
                  <Heading as="h3" fontSize="lg" mb={4}>
                    No cancelled bookings
                  </Heading>
                  <Text color="gray.600">
                    You don't have any cancelled bookings.
                  </Text>
                </Box>
              ) : (
                <VStack spacing={6} align="stretch">
                  {cancelledBookings.map(booking => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </VStack>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  )
}

export default MyBookings