import { useState, useEffect } from 'react'
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  SimpleGrid, 
  Flex, 
  Select, 
  Input, 
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
import { FiFilter, FiMapPin } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'
import HotelCard from '../components/hotels/HotelCard'
import SearchBar from '../components/common/SearchBar'
import { hotels } from '../data/hotels'

function Hotels() {
  const location = useLocation()
  const [filteredHotels, setFilteredHotels] = useState(hotels)
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    rating: 0,
    amenities: []
  })
  
  // Initialize from search params if available
  useEffect(() => {
    if (location.state) {
      const { destination } = location.state
      if (destination) {
        // Filter hotels based on destination
        const filtered = hotels.filter(hotel => 
          hotel.location.toLowerCase().includes(destination.toLowerCase())
        )
        setFilteredHotels(filtered.length > 0 ? filtered : hotels)
      }
    }
  }, [location])
  
  const handlePriceChange = (values) => {
    setFilters({
      ...filters,
      priceRange: values
    })
  }
  
  const handleRatingChange = (e) => {
    setFilters({
      ...filters,
      rating: Number(e.target.value)
    })
  }
  
  const handleAmenityChange = (e) => {
    const { value, checked } = e.target
    let updatedAmenities = [...filters.amenities]
    
    if (checked) {
      updatedAmenities.push(value)
    } else {
      updatedAmenities = updatedAmenities.filter(item => item !== value)
    }
    
    setFilters({
      ...filters,
      amenities: updatedAmenities
    })
  }
  
  const applyFilters = () => {
    let results = [...hotels]
    
    // Filter by price range
    results = results.filter(hotel => 
      hotel.price >= filters.priceRange[0] && hotel.price <= filters.priceRange[1]
    )
    
    // Filter by rating
    if (filters.rating > 0) {
      results = results.filter(hotel => hotel.rating >= filters.rating)
    }
    
    // Filter by amenities
    if (filters.amenities.length > 0) {
      results = results.filter(hotel => 
        filters.amenities.every(amenity => hotel.amenities.includes(amenity))
      )
    }
    
    setFilteredHotels(results)
  }
  
  const resetFilters = () => {
    setFilters({
      priceRange: [0, 1000],
      rating: 0,
      amenities: []
    })
    setFilteredHotels(hotels)
  }
  
  const filterBg = useColorModeValue('white', 'gray.800')
  
  return (
    <Box pt={20} pb={16}>
      <Box bg="gray.50" py={8} mb={8}>
        <Container maxW="1200px">
          <Heading 
            as="h1" 
            fontSize={{ base: '2xl', md: '3xl' }} 
            mb={6}
          >
            Find Your Perfect Hotel
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
                Filters
              </Heading>
              
              <Stack spacing={6}>
                {/* Price Range */}
                <Box>
                  <Text fontWeight="medium" mb={2}>
                    Price Range
                  </Text>
                  <Flex justify="space-between" mb={2}>
                    <Text fontSize="sm">${filters.priceRange[0]}</Text>
                    <Text fontSize="sm">${filters.priceRange[1]}</Text>
                  </Flex>
                  <RangeSlider
                    min={0}
                    max={1000}
                    step={50}
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
                
                {/* Rating */}
                <Box>
                  <Text fontWeight="medium" mb={2}>
                    Minimum Rating
                  </Text>
                  <Select 
                    value={filters.rating} 
                    onChange={handleRatingChange}
                  >
                    <option value={0}>Any Rating</option>
                    <option value={3}>3+ Stars</option>
                    <option value={4}>4+ Stars</option>
                    <option value={4.5}>4.5+ Stars</option>
                  </Select>
                </Box>
                
                {/* Amenities */}
                <Box>
                  <Text fontWeight="medium" mb={2}>
                    Amenities
                  </Text>
                  <Stack spacing={2}>
                    <Checkbox 
                      value="pool" 
                      onChange={handleAmenityChange}
                      isChecked={filters.amenities.includes('pool')}
                    >
                      Swimming Pool
                    </Checkbox>
                    <Checkbox 
                      value="spa" 
                      onChange={handleAmenityChange}
                      isChecked={filters.amenities.includes('spa')}
                    >
                      Spa & Wellness
                    </Checkbox>
                    <Checkbox 
                      value="gym" 
                      onChange={handleAmenityChange}
                      isChecked={filters.amenities.includes('gym')}
                    >
                      Fitness Center
                    </Checkbox>
                    <Checkbox 
                      value="restaurant" 
                      onChange={handleAmenityChange}
                      isChecked={filters.amenities.includes('restaurant')}
                    >
                      Restaurant
                    </Checkbox>
                    <Checkbox 
                      value="wifi" 
                      onChange={handleAmenityChange}
                      isChecked={filters.amenities.includes('wifi')}
                    >
                      Free WiFi
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
                  Apply Filters
                </Button>
                <Button 
                  variant="outline" 
                  onClick={resetFilters}
                >
                  Reset
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
                {filteredHotels.length} hotels found
              </Text>
              
              <Select 
                maxW="200px" 
                placeholder="Sort by" 
                size="sm"
              >
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="ratingDesc">Highest Rated</option>
                <option value="popular">Most Popular</option>
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
                  No hotels found matching your criteria.
                </Text>
                <Text color="gray.600" mt={2}>
                  Try adjusting your filters for more results.
                </Text>
              </Box>
            ) : (
              <SimpleGrid 
                columns={{ base: 1, md: 2, lg: 3 }} 
                spacing={6}
              >
                {filteredHotels.map(hotel => (
                  <HotelCard key={hotel.id} hotel={hotel} />
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