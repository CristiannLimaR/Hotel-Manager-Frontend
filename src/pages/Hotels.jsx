import { useState, useEffect } from 'react'
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  SimpleGrid, 
  Flex, 
  Select, 
  Button, 
  HStack, 
  Stack, 
  Checkbox,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  useColorModeValue
} from '@chakra-ui/react'
import HotelCard from '../components/hotels/HotelCard'
import SearchBar from '../components/common/SearchBar'
import useHotel from '../shared/hooks/useHotel'
import { useSearch } from '../shared/context/SearchContext'

function Hotels() {
  const { getHotels } = useHotel()
  const { searchParams } = useSearch()
  const [hotels, setHotels] = useState([])
  const [filteredHotels, setFilteredHotels] = useState([])
  const [filters, setFilters] = useState({
    priceRange: [500, 3000],
    category: '',
    facilities: []
  })
  const [sortBy, setSortBy] = useState('')
  const filterBg = useColorModeValue('white', 'gray.800')

  useEffect(() => {
    const fetchHotels = async () => {
      const response = await getHotels()
      setHotels(response)
      setFilteredHotels(response)
    }
    fetchHotels()
  }, [])
  
  // Aplicar filtros cuando cambien los parámetros de búsqueda
  useEffect(() => {
    let filtered = [...hotels]
    
    // Filter by destination
    if (searchParams.destination) {
      filtered = filtered.filter(hotel => 
        hotel.location?.toLowerCase().includes(searchParams.destination.toLowerCase()) ||
        hotel.direction?.toLowerCase().includes(searchParams.destination.toLowerCase())
      )
    }

    // Filter by room availability
    if (searchParams.checkIn && searchParams.checkOut) {
      const checkInDate = new Date(searchParams.checkIn)
      const checkOutDate = new Date(searchParams.checkOut)
      const guests = parseInt(searchParams.guests || '2')
      
      filtered = filtered.filter(hotel => {
        return hotel.rooms.some(room => {
          // Verificar capacidad
          if (room.capacity < guests) {
            return false
          }

          // Si la habitación no tiene períodos de no disponibilidad, está disponible
          if (!room.nonAvailability || room.nonAvailability.length === 0) {
            return true
          }

          // Verificar si las fechas seleccionadas se superponen con algún período de no disponibilidad
          return !room.nonAvailability.some(period => {
            const periodStart = new Date(period.start)
            const periodEnd = new Date(period.end)
            
            return (
              (checkInDate >= periodStart && checkInDate < periodEnd) ||
              (checkOutDate > periodStart && checkOutDate <= periodEnd) ||
              (checkInDate <= periodStart && checkOutDate >= periodEnd)
            )
          })
        })
      })
    }
    
    setFilteredHotels(filtered)
  }, [hotels, searchParams])
  
  const handlePriceChange = (values) => {
    setFilters({
      ...filters,
      priceRange: values
    })
  }
  
  const handleCategoryChange = (e) => {
    setFilters({
      ...filters,
      category: e.target.value
    })
  }
  
  const handleFacilityChange = (e) => {
    const { value, checked } = e.target
    let updatedFacilities = [...filters.facilities]
    
    if (checked) {
      updatedFacilities.push(value)
    } else {
      updatedFacilities = updatedFacilities.filter(item => item !== value)
    }
    
    setFilters({
      ...filters,
      facilities: updatedFacilities
    })
  }
  
  const applyFilters = () => {
    let results = [...filteredHotels]
    
    // Filter by price range
    results = results.filter(hotel => 
      hotel.rangeOfPrices.min >= filters.priceRange[0] && 
      hotel.rangeOfPrices.max <= filters.priceRange[1]
    )
    
    // Filter by category
    if (filters.category) {
      results = results.filter(hotel => hotel.category === filters.category)
    }
    
    // Filter by facilities
    if (filters.facilities.length > 0) {
      results = results.filter(hotel => 
        filters.facilities.every(facility => hotel.facilities.includes(facility))
      )
    }
    
    setFilteredHotels(results)
  }
  
  const resetFilters = () => {
    setFilters({
      priceRange: [500, 3000],
      category: '',
      facilities: []
    })
    setFilteredHotels(hotels)
  }
  
  const handleSortChange = (e) => {
    const value = e.target.value
    setSortBy(value)
    
    let sortedHotels = [...filteredHotels]
    
    switch (value) {
      case 'priceAsc':
        sortedHotels.sort((a, b) => a.rangeOfPrices.min - b.rangeOfPrices.min)
        break
      case 'priceDesc':
        sortedHotels.sort((a, b) => b.rangeOfPrices.max - a.rangeOfPrices.max)
        break
      case 'ratingDesc':
        sortedHotels.sort((a, b) => b.rating - a.rating)
        break
      case 'popular':
        sortedHotels.sort((a, b) => b.reviews?.length - a.reviews?.length)
        break
      default:
        break
    }
    
    setFilteredHotels(sortedHotels)
  }
  
  return (
    <Box pt={20} pb={16}>
      <Box bg="gray.50" py={8} mb={8}>
        <Container maxW="1200px">
          <Heading 
            as="h1" 
            fontSize={{ base: '2xl', md: '3xl' }} 
            mb={6}
          >
            Encuentra Tu Hotel Perfecto
          </Heading>
          
          <Box 
            bg="white" 
            p={5} 
            borderRadius="lg" 
            boxShadow="sm"
          >
            <SearchBar />
          </Box>
        </Container>
      </Box>
      
      <Container maxW="1200px">
        <Flex 
          flexDirection={{ base: 'column', md: 'row' }} 
          gap={8}
        >
          {/* Filters sidebar */}
          <Box 
            w={{ base: '100%', md: '300px' }} 
            flexShrink={0}
          >
            <Box 
              p={5} 
              borderRadius="lg" 
              bg={filterBg} 
              boxShadow="sm" 
              mb={4}
            >
              <Heading as="h3" fontSize="lg" mb={5}>
                Filtros
              </Heading>
              
              <Stack spacing={6}>
                {/* Price Range */}
                <Box>
                  <Text fontWeight="medium" mb={2}>
                    Rango de Precios
                  </Text>
                  <Flex justify="space-between" mb={2}>
                    <Text fontSize="sm">${filters.priceRange[0]}</Text>
                    <Text fontSize="sm">${filters.priceRange[1]}</Text>
                  </Flex>
                  <RangeSlider
                    min={500}
                    max={3000}
                    step={100}
                    value={filters.priceRange}
                    onChange={handlePriceChange}
                    colorScheme="teal"
                  >
                    <RangeSliderTrack>
                      <RangeSliderFilledTrack />
                    </RangeSliderTrack>
                    <RangeSliderThumb index={0} />
                    <RangeSliderThumb index={1} />
                  </RangeSlider>
                </Box>
                
                {/* Category */}
                <Box>
                  <Text fontWeight="medium" mb={2}>
                    Categoría
                  </Text>
                  <Select 
                    value={filters.category} 
                    onChange={handleCategoryChange}
                  >
                    <option value="">Todas las Categorías</option>
                    <option value="1 Estrella">1 Estrella</option>
                    <option value="2 Estrellas">2 Estrellas</option>
                    <option value="3 Estrellas">3 Estrellas</option>
                    <option value="4 Estrellas">4 Estrellas</option>
                    <option value="5 Estrellas">5 Estrellas</option>
                  </Select>
                </Box>
                
                {/* Facilities */}
                <Box>
                  <Text fontWeight="medium" mb={2}>
                    Instalaciones
                  </Text>
                  <Stack spacing={2} maxH="300px" overflowY="auto">
                    <Checkbox 
                      value="Wifi" 
                      onChange={handleFacilityChange}
                      isChecked={filters.facilities.includes('Wifi')}
                    >
                      Wifi
                    </Checkbox>
                    <Checkbox 
                      value="Piscina" 
                      onChange={handleFacilityChange}
                      isChecked={filters.facilities.includes('Piscina')}
                    >
                      Piscina
                    </Checkbox>
                    <Checkbox 
                      value="Estacionamiento" 
                      onChange={handleFacilityChange}
                      isChecked={filters.facilities.includes('Estacionamiento')}
                    >
                      Estacionamiento
                    </Checkbox>
                    <Checkbox 
                      value="Parking Privado" 
                      onChange={handleFacilityChange}
                      isChecked={filters.facilities.includes('Parking Privado')}
                    >
                      Parking Privado
                    </Checkbox>
                    <Checkbox 
                      value="Recepción 24h" 
                      onChange={handleFacilityChange}
                      isChecked={filters.facilities.includes('Recepción 24h')}
                    >
                      Recepción 24h
                    </Checkbox>
                    <Checkbox 
                      value="Calefacción" 
                      onChange={handleFacilityChange}
                      isChecked={filters.facilities.includes('Calefacción')}
                    >
                      Calefacción
                    </Checkbox>
                    <Checkbox 
                      value="Aire Acondicionado" 
                      onChange={handleFacilityChange}
                      isChecked={filters.facilities.includes('Aire Acondicionado')}
                    >
                      Aire Acondicionado
                    </Checkbox>
                    <Checkbox 
                      value="Habitaciones Privadas" 
                      onChange={handleFacilityChange}
                      isChecked={filters.facilities.includes('Habitaciones Privadas')}
                    >
                      Habitaciones Privadas
                    </Checkbox>
                    <Checkbox 
                      value="Servicios Premium" 
                      onChange={handleFacilityChange}
                      isChecked={filters.facilities.includes('Servicios Premium')}
                    >
                      Servicios Premium
                    </Checkbox>
                    <Checkbox 
                      value="Gimnasio" 
                      onChange={handleFacilityChange}
                      isChecked={filters.facilities.includes('Gimnasio')}
                    >
                      Gimnasio
                    </Checkbox>
                    <Checkbox 
                      value="Spa" 
                      onChange={handleFacilityChange}
                      isChecked={filters.facilities.includes('Spa')}
                    >
                      Spa
                    </Checkbox>
                    <Checkbox 
                      value="Restaurante" 
                      onChange={handleFacilityChange}
                      isChecked={filters.facilities.includes('Restaurante')}
                    >
                      Restaurante
                    </Checkbox>
                    <Checkbox 
                      value="Bar" 
                      onChange={handleFacilityChange}
                      isChecked={filters.facilities.includes('Bar')}
                    >
                      Bar
                    </Checkbox>
                    <Checkbox 
                      value="Terraza" 
                      onChange={handleFacilityChange}
                      isChecked={filters.facilities.includes('Terraza')}
                    >
                      Terraza
                    </Checkbox>
                    <Checkbox 
                      value="Jardín" 
                      onChange={handleFacilityChange}
                      isChecked={filters.facilities.includes('Jardín')}
                    >
                      Jardín
                    </Checkbox>
                    <Checkbox 
                      value="Salas de Reuniones" 
                      onChange={handleFacilityChange}
                      isChecked={filters.facilities.includes('Salas de Reuniones')}
                    >
                      Salas de Reuniones
                    </Checkbox>
                    <Checkbox 
                      value="Servicio de Limpieza" 
                      onChange={handleFacilityChange}
                      isChecked={filters.facilities.includes('Servicio de Limpieza')}
                    >
                      Servicio de Limpieza
                    </Checkbox>
                    <Checkbox 
                      value="Servicio de Lavandería" 
                      onChange={handleFacilityChange}
                      isChecked={filters.facilities.includes('Servicio de Lavandería')}
                    >
                      Servicio de Lavandería
                    </Checkbox>
                    <Checkbox 
                      value="Servicio de Concierge" 
                      onChange={handleFacilityChange}
                      isChecked={filters.facilities.includes('Servicio de Concierge')}
                    >
                      Servicio de Concierge
                    </Checkbox>
                    <Checkbox 
                      value="Servicio de Traslado" 
                      onChange={handleFacilityChange}
                      isChecked={filters.facilities.includes('Servicio de Traslado')}
                    >
                      Servicio de Traslado
                    </Checkbox>
                    <Checkbox 
                      value="Caja Fuerte" 
                      onChange={handleFacilityChange}
                      isChecked={filters.facilities.includes('Caja Fuerte')}
                    >
                      Caja Fuerte
                    </Checkbox>
                    <Checkbox 
                      value="Ascensor" 
                      onChange={handleFacilityChange}
                      isChecked={filters.facilities.includes('Ascensor')}
                    >
                      Ascensor
                    </Checkbox>
                    <Checkbox 
                      value="Acceso para Discapacitados" 
                      onChange={handleFacilityChange}
                      isChecked={filters.facilities.includes('Acceso para Discapacitados')}
                    >
                      Acceso para Discapacitados
                    </Checkbox>
                    <Checkbox 
                      value="Mascotas Permitidas" 
                      onChange={handleFacilityChange}
                      isChecked={filters.facilities.includes('Mascotas Permitidas')}
                    >
                      Mascotas Permitidas
                    </Checkbox>
                  </Stack>
                </Box>
              </Stack>
              
              <HStack spacing={4} mt={8}>
                <Button 
                  colorScheme="teal" 
                  onClick={applyFilters} 
                  w="full"
                >
                  Aplicar Filtros
                </Button>
                <Button 
                  variant="outline" 
                  onClick={resetFilters}
                >
                  Restablecer
                </Button>
              </HStack>
            </Box>
          </Box>
          
          {/* Hotels grid */}
          <Box flex="1">
            <Flex 
              justify="space-between" 
              align="center" 
              mb={6}
            >
              <Text color="gray.600">
                {filteredHotels.length} hoteles encontrados
              </Text>
              
              <Select 
                maxW="200px" 
                placeholder="Ordenar por" 
                size="sm"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="priceAsc">Precio: Menor a Mayor</option>
                <option value="priceDesc">Precio: Mayor a Menor</option>
                <option value="ratingDesc">Mejor Calificación</option>
                <option value="popular">Más Populares</option>
              </Select>
            </Flex>
            
            {filteredHotels.length === 0 ? (
              <Box 
                py={10} 
                textAlign="center" 
                bg="gray.50" 
                borderRadius="md"
              >
                <Text fontSize="lg" fontWeight="medium">
                  {searchParams.destination 
                    ? `No hay hoteles disponibles para '${searchParams.destination}'`
                    : 'No se encontraron hoteles que coincidan con tus criterios'
                  }
                </Text>
                <Text color="gray.600" mt={2}>
                  {searchParams.destination
                    ? 'Intenta buscar en otra ubicación o ajusta tus filtros.'
                    : 'Intenta ajustar tus filtros para obtener más resultados.'
                  }
                </Text>
              </Box>
            ) : (
              <SimpleGrid 
                columns={{ base: 1, md: 2, lg: 3 }} 
                spacing={6}
              >
                {filteredHotels.map(hotel => (
                  <HotelCard key={hotel.uid} hotel={hotel} />
                ))}
              </SimpleGrid>
            )}
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default Hotels