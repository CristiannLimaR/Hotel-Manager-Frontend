import { useState, useEffect } from 'react'
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Button, 
  Flex, 
  Grid, 
  GridItem, 
  FormControl, 
  FormLabel, 
  Input, 
  Select, 
  Checkbox, 
  Divider, 
  Image, 
  Icon, 
  VStack, 
  HStack, 
  useToast,
  Radio, 
  RadioGroup,
  Stack
} from '@chakra-ui/react'
import { FiCheck, FiCreditCard, FiCalendar } from 'react-icons/fi'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { hotels } from '../data/hotels'

function Booking() {
  const { hotelId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const toast = useToast()
  
  // Get the room index from the query parameters
  const queryParams = new URLSearchParams(location.search)
  const roomIndex = parseInt(queryParams.get('room') || '0')
  
  // Find the hotel
  const hotel = hotels.find(h => h.id === parseInt(hotelId)) || hotels[0]
  
  // Get the room type
  const roomType = hotel.roomTypes ? hotel.roomTypes[roomIndex] : null
  const roomPrice = roomType ? roomType.price : hotel.price
  const roomName = roomType ? roomType.name : 'Deluxe Room'
  
  // Calculate dates (3 days from now for check-in, 6 days from now for check-out)
  const getDefaultDates = () => {
    const checkIn = new Date()
    checkIn.setDate(checkIn.getDate() + 3)
    
    const checkOut = new Date()
    checkOut.setDate(checkOut.getDate() + 6)
    
    return {
      checkIn: checkIn.toISOString().split('T')[0],
      checkOut: checkOut.toISOString().split('T')[0]
    }
  }
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    paymentMethod: 'creditCard',
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    agreeTerms: false,
    ...getDefaultDates()
  })
  
  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Calculate number of nights
  const calculateNights = () => {
    const checkIn = new Date(formData.checkIn)
    const checkOut = new Date(formData.checkOut)
    const timeDiff = checkOut.getTime() - checkIn.getTime()
    return Math.ceil(timeDiff / (1000 * 3600 * 24)) || 3 // Default to 3 if calculation fails
  }
  
  const nights = calculateNights()
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }
  
  // Handle radio button changes
  const handleRadioChange = (value) => {
    setFormData({
      ...formData,
      paymentMethod: value
    })
  }
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.agreeTerms) {
      toast({
        title: 'Please agree to the terms and conditions',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Booking Confirmed!',
        description: 'Your hotel booking has been successfully confirmed.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      
      setIsSubmitting(false)
      navigate('/my-bookings')
    }, 1500)
  }
  
  // Calculate price breakdown
  const pricePerNight = roomPrice
  const subtotal = pricePerNight * nights
  const taxesAndFees = Math.round(subtotal * 0.15)
  const total = subtotal + taxesAndFees
  
  return (
    <Box pt={24} pb={16}>
      <Container maxW="1200px">
        <Heading as="h1" fontSize={{ base: '2xl', md: '3xl' }} mb={8}>
          Complete Your Booking
        </Heading>
        
        <Grid 
          templateColumns={{ base: '1fr', lg: '3fr 2fr' }} 
          gap={8}
          as="form"
          onSubmit={handleSubmit}
        >
          <Box>
            {/* Guest Details */}
            <Box 
              mb={8} 
              p={6} 
              borderWidth="1px" 
              borderRadius="lg"
              boxShadow="sm"
            >
              <Heading as="h2" fontSize="xl" mb={4}>
                Guest Details
              </Heading>
              
              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                <FormControl isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel>Email Address</FormLabel>
                  <Input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <Input 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Grid>
              
              <FormControl mt={4}>
                <FormLabel>Special Requests</FormLabel>
                <Input 
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  placeholder="Any special requests or preferences"
                />
              </FormControl>
            </Box>
            
            {/* Booking Details */}
            <Box 
              mb={8} 
              p={6} 
              borderWidth="1px" 
              borderRadius="lg"
              boxShadow="sm"
            >
              <Heading as="h2" fontSize="xl" mb={4}>
                Booking Details
              </Heading>
              
              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} mb={4}>
                <FormControl isRequired>
                  <FormLabel>Check-in Date</FormLabel>
                  <Input 
                    type="date"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                  />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel>Check-out Date</FormLabel>
                  <Input 
                    type="date"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Grid>
              
              <Flex 
                bg="gray.50" 
                p={4} 
                borderRadius="md" 
                align="center"
              >
                <Icon as={FiCalendar} color="brand.500" boxSize={5} mr={3} />
                <Box>
                  <Text fontWeight="medium">
                    Your stay: {nights} {nights === 1 ? 'night' : 'nights'}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {new Date(formData.checkIn).toLocaleDateString()} to {new Date(formData.checkOut).toLocaleDateString()}
                  </Text>
                </Box>
              </Flex>
            </Box>
            
            {/* Payment Information */}
            <Box 
              p={6} 
              borderWidth="1px" 
              borderRadius="lg"
              boxShadow="sm"
            >
              <Heading as="h2" fontSize="xl" mb={4}>
                Payment Information
              </Heading>
              
              <RadioGroup 
                onChange={handleRadioChange} 
                value={formData.paymentMethod}
                mb={6}
              >
                <Stack direction={{ base: 'column', md: 'row' }} spacing={5}>
                  <Radio value="creditCard">Credit Card</Radio>
                  <Radio value="paypal">PayPal</Radio>
                  <Radio value="payAtHotel">Pay at Hotel</Radio>
                </Stack>
              </RadioGroup>
              
              {formData.paymentMethod === 'creditCard' && (
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                  <GridItem colSpan={{ base: 1, md: 2 }}>
                    <FormControl isRequired>
                      <FormLabel>Card Number</FormLabel>
                      <Input 
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="XXXX XXXX XXXX XXXX"
                      />
                    </FormControl>
                  </GridItem>
                  
                  <FormControl isRequired>
                    <FormLabel>Card Holder</FormLabel>
                    <Input 
                      name="cardHolder"
                      value={formData.cardHolder}
                      onChange={handleInputChange}
                      placeholder="Name on card"
                    />
                  </FormControl>
                  
                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <FormControl isRequired>
                      <FormLabel>Expiry Date</FormLabel>
                      <Input 
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                      />
                    </FormControl>
                    
                    <FormControl isRequired>
                      <FormLabel>CVV</FormLabel>
                      <Input 
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="XXX"
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              )}
              
              {formData.paymentMethod === 'paypal' && (
                <Box p={4} bg="gray.50" borderRadius="md">
                  <Text>
                    You will be redirected to PayPal to complete your payment after confirming your booking.
                  </Text>
                </Box>
              )}
              
              {formData.paymentMethod === 'payAtHotel' && (
                <Box p={4} bg="gray.50" borderRadius="md">
                  <Text>
                    No payment required now. You will pay directly at the hotel during check-in.
                  </Text>
                </Box>
              )}
              
              <Checkbox 
                mt={6} 
                name="agreeTerms"
                isChecked={formData.agreeTerms}
                onChange={handleInputChange}
              >
                I agree to the <Box as="span" color="brand.500">terms and conditions</Box>
              </Checkbox>
            </Box>
          </Box>
          
          {/* Booking Summary */}
          <Box>
            <Box 
              p={6} 
              borderWidth="1px" 
              borderRadius="lg"
              boxShadow="md"
              position="sticky"
              top="100px"
            >
              <Heading as="h2" fontSize="xl" mb={4}>
                Booking Summary
              </Heading>
              
              <Flex mb={6} borderRadius="md" overflow="hidden" borderWidth="1px">
                <Image 
                  src={hotel.image} 
                  alt={hotel.name} 
                  w="100px" 
                  h="100px" 
                  objectFit="cover"
                />
                <Box p={3}>
                  <Heading as="h3" fontSize="md" mb={1}>
                    {hotel.name}
                  </Heading>
                  <Text fontSize="sm" color="gray.600" mb={1}>
                    {hotel.location}
                  </Text>
                  <Text fontSize="sm" fontWeight="medium">
                    {roomName}
                  </Text>
                </Box>
              </Flex>
              
              <VStack align="stretch" spacing={3} mb={6}>
                <Flex justify="space-between">
                  <Text>Check-in</Text>
                  <Text fontWeight="medium">
                    {formData.checkIn ? new Date(formData.checkIn).toLocaleDateString() : 'Not selected'}
                  </Text>
                </Flex>
                
                <Flex justify="space-between">
                  <Text>Check-out</Text>
                  <Text fontWeight="medium">
                    {formData.checkOut ? new Date(formData.checkOut).toLocaleDateString() : 'Not selected'}
                  </Text>
                </Flex>
                
                <Flex justify="space-between">
                  <Text>Room</Text>
                  <Text fontWeight="medium">{roomName}</Text>
                </Flex>
                
                <Flex justify="space-between">
                  <Text>Guests</Text>
                  <Text fontWeight="medium">2 Adults</Text>
                </Flex>
              </VStack>
              
              <Divider mb={4} />
              
              <VStack align="stretch" spacing={3}>
                <Flex justify="space-between">
                  <Text>${pricePerNight} x {nights} nights</Text>
                  <Text>${subtotal}</Text>
                </Flex>
                
                <Flex justify="space-between">
                  <Text>Taxes and fees</Text>
                  <Text>${taxesAndFees}</Text>
                </Flex>
                
                <Divider />
                
                <Flex justify="space-between" fontWeight="bold">
                  <Text>Total</Text>
                  <Text>${total}</Text>
                </Flex>
              </VStack>
              
              <Button
                mt={6}
                w="full"
                size="lg"
                colorScheme="teal"
                type="submit"
                isLoading={isSubmitting}
                loadingText="Confirming"
              >
                Confirm Booking
              </Button>
              
              <HStack mt={4} spacing={2} justify="center">
                <Icon as={FiCheck} color="green.500" />
                <Text fontSize="sm" color="gray.600">
                  Free cancellation until 24 hours before check-in
                </Text>
              </HStack>
            </Box>
          </Box>
        </Grid>
      </Container>
    </Box>
  )
}

export default Booking