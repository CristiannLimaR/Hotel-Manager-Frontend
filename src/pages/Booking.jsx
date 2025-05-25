import { useState, useEffect } from 'react'
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Button, 
  Grid, 
  GridItem, 
  FormControl, 
  FormLabel, 
  Input, 
  Select, 
  Divider, 
  Icon, 
  VStack, 
  HStack, 
  useToast,
  Stack,
  Card,
  CardBody,
  Spinner,
  Checkbox,
  CheckboxGroup,
  useColorModeValue
} from '@chakra-ui/react'
import { FiUsers, FiClock, FiAlertCircle } from 'react-icons/fi'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import useHotel from '../shared/hooks/useHotel'
import useAuthStore from '../shared/stores/authStore'
import { useReservation } from '../shared/hooks/useReservation'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import es from 'date-fns/locale/es'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

function Booking() {
  const { hotelId, roomId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()
  const { getHotelById } = useHotel()
  const { isAuthenticated } = useAuthStore()
  const [hotel, setHotel] = useState(null)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [bookingData, setBookingData] = useState({
    checkInDate: null,
    checkOutDate: null,
    guests: 1,
    services: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { saveReservation } = useReservation()
  
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.800', 'white')

  useEffect(() => {
    if (location.state) {
      const { checkIn, checkOut, guests } = location.state
      setBookingData(prev => ({
        ...prev,
        checkInDate: checkIn ? new Date(checkIn) : null,
        checkOutDate: checkOut ? new Date(checkOut) : null,
        guests: guests || 1
      }))
    }
  }, [location.state])

  const getDisabledDates = () => {
    if (!selectedRoom?.nonAvailability) return [];
    
    return selectedRoom.nonAvailability.flatMap(period => {
      const start = dayjs(period.start);
      const end = dayjs(period.end);
      const dates = [];
      let current = start;
      
      while (current.isBefore(end) || current.isSame(end, 'day')) {
        dates.push(new Date(current));
        current = current.add(1, 'day');
      }
      
      return dates;
    });
  };

  const calculateNights = () => {
    if (!bookingData.checkInDate || !bookingData.checkOutDate) return 0;
    const checkIn = dayjs(bookingData.checkInDate);
    const checkOut = dayjs(bookingData.checkOutDate);
    return checkOut.diff(checkIn, 'day');
  }

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setBookingData(prev => ({
      ...prev,
      checkInDate: start,
      checkOutDate: end
    }));
  };

  const handleGuestsChange = (e) => {
    setBookingData(prev => ({
      ...prev,
      guests: e.target.value
    }));
  };

  const handleServicesChange = (selectedServices) => {
    setBookingData(prev => ({
      ...prev,
      services: selectedServices.map(serviceId => ({
        service: serviceId
      }))
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: 'Error',
        description: 'Debes iniciar sesión para realizar una reserva',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    
    if (!bookingData.checkInDate || !bookingData.checkOutDate) {
      toast({
        title: 'Error',
        description: 'Por favor selecciona las fechas de entrada y salida',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    
    try {
      await saveReservation({ 
        hotel: hotelId, 
        room: roomId,
        checkInDate: bookingData.checkInDate.toISOString(),
        checkOutDate: bookingData.checkOutDate.toISOString(),
        services: bookingData.services
      });
      navigate('/my-bookings');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.msg || 'No se pudo procesar tu reserva',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await getHotelById(hotelId)
        setHotel(response)
        const room = response.rooms.find(r => r._id === roomId)
        if (room) {
          setSelectedRoom(room)
          console.log(room)
        } else {
          setError('No se encontró la habitación seleccionada')
        }
      } catch (error) {
        console.error('Error al cargar el hotel:', error)
        setError('No se pudo cargar la información del hotel')
      } finally {
        setLoading(false)
      }
    }
    fetchHotel()
  }, [hotelId, roomId])
  
  if (loading) {
    return (
      <Box pt={20} pb={16}>
        <Container maxW="1200px">
          <Stack spacing={4} align="center" justify="center" minH="400px">
            <Spinner size="xl" color="teal.500" />
            <Text>Cargando información del hotel...</Text>
          </Stack>
        </Container>
      </Box>
    )
  }

  if (error) {
    return (
      <Box pt={20} pb={16}>
        <Container maxW="1200px">
          <Stack spacing={4} align="center" justify="center" minH="400px">
            <Icon as={FiAlertCircle} w={12} h={12} color="red.500" />
            <Text fontSize="xl" color="red.500">{error}</Text>
            <Button colorScheme="teal" onClick={() => navigate('/hotels')}>
              Volver a Hoteles
            </Button>
          </Stack>
        </Container>
      </Box>
    )
  }
  
  if (!hotel || !selectedRoom) {
    return (
      <Box pt={20} pb={16}>
        <Container maxW="1200px">
          <Stack spacing={4} align="center" justify="center" minH="400px">
            <Icon as={FiAlertCircle} w={12} h={12} color="red.500" />
            <Text fontSize="xl" color="red.500">No se encontró la información del hotel</Text>
            <Button colorScheme="teal" onClick={() => navigate('/hotels')}>
              Volver a Hoteles
            </Button>
          </Stack>
        </Container>
      </Box>
    )
  }
  
  const customDatePickerStyles = {
    width: '100%',
    '.react-datepicker': {
      fontFamily: 'inherit',
      border: 'none',
      boxShadow: 'lg',
      borderRadius: 'lg',
      backgroundColor: bgColor,
      color: textColor,
    },
    '.react-datepicker__header': {
      backgroundColor: 'teal.500',
      color: 'white',
      borderBottom: 'none',
      borderTopLeftRadius: 'lg',
      borderTopRightRadius: 'lg',
    },
    '.react-datepicker__current-month': {
      color: 'white',
      fontWeight: 'bold',
      fontSize: '1.1em',
    },
    '.react-datepicker__day-name': {
      color: 'white',
      fontWeight: 'bold',
    },
    '.react-datepicker__day': {
      color: textColor,
      borderRadius: 'md',
      margin: '0.2em',
      width: '2.5em',
      lineHeight: '2.5em',
    },
    '.react-datepicker__day:hover': {
      backgroundColor: 'teal.100',
    },
    '.react-datepicker__day--selected': {
      backgroundColor: 'teal.500',
      color: 'white',
    },
    '.react-datepicker__day--in-range': {
      backgroundColor: 'teal.100',
      color: 'teal.700',
    },
    '.react-datepicker__day--disabled': {
      color: 'gray.400',
      backgroundColor: 'gray.100',
    },
    '.react-datepicker__navigation': {
      top: '1em',
    },
    '.react-datepicker__navigation-icon::before': {
      borderColor: 'white',
    },
  };

  return (
    <Box pt={20} pb={16}>
      <Container maxW="1200px">
        <Heading as="h1" fontSize={{ base: '2xl', md: '3xl' }} mb={8}>
          Reserva tu Habitación
        </Heading>
        
        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
          <GridItem>
            <Card bg={bgColor} borderWidth="1px" borderColor={borderColor}>
              <CardBody>
                <form onSubmit={handleSubmit}>
                  <Stack spacing={6}>
                    {/* Fechas */}
                    <FormControl isRequired>
                      <FormLabel>Selecciona tus fechas</FormLabel>
                      <Box sx={customDatePickerStyles}>
                        <DatePicker
                          selected={bookingData.checkInDate}
                          onChange={handleDateChange}
                          startDate={bookingData.checkInDate}
                          endDate={bookingData.checkOutDate}
                          selectsRange
                          inline
                          minDate={new Date()}
                          excludeDates={getDisabledDates()}
                          monthsShown={2}
                          locale={es}
                          dateFormat="dd/MM/yyyy"
                          showPopperArrow={false}
                          calendarStartDay={1}
                          dayClassName={date => {
                            if (getDisabledDates().some(d => dayjs(d).isSame(date, 'day'))) {
                              return 'disabled-date';
                            }
                            return null;
                          }}
                        />
                      </Box>
                    </FormControl>
                    
                    {/* Huéspedes */}
                    <FormControl isRequired>
                      <FormLabel>Número de Huéspedes</FormLabel>
                      <Select
                        name="guests"
                        value={bookingData.guests}
                        onChange={handleGuestsChange}
                      >
                        {[...Array(selectedRoom?.capacity || 0)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} {i === 0 ? 'Huésped' : 'Huéspedes'}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  
                    {/* Servicios Adicionales */}
                    <FormControl>
                      <FormLabel>Servicios Adicionales</FormLabel>
                      <CheckboxGroup colorScheme="teal" onChange={handleServicesChange}>
                        <Stack spacing={2}>
                          {hotel?.services?.map(service => (
                            <Checkbox key={service._id} value={service._id}>
                              {service.name} - ${service.price}
                            </Checkbox>
                          ))}
                        </Stack>
                      </CheckboxGroup>
                    </FormControl>
                    
                    <Button type="submit" colorScheme="teal" size="lg">
                      Confirmar Reserva
                    </Button>
                  </Stack>
                </form>
              </CardBody>
            </Card>
          </GridItem>
          
          {/* Resumen de la Reserva */}
          <GridItem>
            <Card bg="white" borderWidth="1px" borderColor="gray.200" position="sticky" top="100px">
              <CardBody>
                <VStack spacing={6} align="stretch">
                  <Heading size="md">Resumen de la Reserva</Heading>
                  
                  {/* Información del Hotel */}
                  <Box>
                    <Text fontWeight="medium" mb={2}>{hotel?.name}</Text>
                    <Text color="gray.600" fontSize="sm">{hotel?.direction}</Text>
                  </Box>
                  
                  <Divider />
                  
                  {/* Información de la Habitación */}
                  <Box>
                    <Text fontWeight="medium" mb={2}>{selectedRoom?.type}</Text>
                    <HStack spacing={4}>
                      <HStack>
                        <Icon as={FiUsers} />
                        <Text>{selectedRoom?.capacity} Huéspedes</Text>
                      </HStack>
                      <HStack>
                        <Icon as={FiClock} />
                        <Text>{calculateNights()} Noches</Text>
                      </HStack>
                    </HStack>
                  </Box>
                  
                  <Divider />
                  
                  {/* Desglose de Precios */}
                  <Box>
                    <HStack justify="space-between" mb={2}>
                      <Text>Precio por noche</Text>
                      <Text>${selectedRoom?.price_per_night}</Text>
                    </HStack>
                    <HStack justify="space-between" mb={2}>
                      <Text>Noches</Text>
                      <Text>{calculateNights()}</Text>
                    </HStack>
                    {bookingData.services.length > 0 && (
                      <>
                        <Divider my={2} />
                        <Text fontWeight="medium" mb={2}>Servicios Adicionales:</Text>
                        {bookingData.services.map(({ service: serviceId }) => {
                          const service = hotel?.services?.find(s => s._id === serviceId);
                          return (
                            <HStack key={serviceId} justify="space-between" mb={1}>
                              <Text fontSize="sm">{service?.name}</Text>
                              <Text fontSize="sm">${service?.price}</Text>
                            </HStack>
                          );
                        })}
                      </>
                    )}
                    <Divider my={2} />
                    <HStack justify="space-between" fontWeight="bold">
                      <Text>Total</Text>
                      <Text color="teal.500">
                        ${calculateNights() * (selectedRoom?.price_per_night || 0) + 
                          bookingData.services.reduce((total, { service: serviceId }) => {
                            const service = hotel?.services?.find(s => s._id === serviceId);
                            return total + (service?.price || 0);
                          }, 0)}
                      </Text>
                    </HStack>
                  </Box>
                </VStack>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}

export default Booking