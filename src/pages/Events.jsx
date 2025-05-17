import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  SimpleGrid, 
  Select, 
  Input, 
  Button, 
  Flex,
  Icon,
  VStack,
  useColorModeValue
} from '@chakra-ui/react'
import { useState } from 'react'
import { FiFilter } from 'react-icons/fi'
import EventCard from '../components/events/EventCard'
import { events } from '../data/events'

function Events() {
  const [filteredEvents, setFilteredEvents] = useState(events)
  const [filters, setFilters] = useState({
    type: '',
    capacity: '',
    priceRange: ''
  })
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const applyFilters = () => {
    let results = [...events]
    
    if (filters.type) {
      results = results.filter(event => event.type === filters.type)
    }
    
    if (filters.capacity) {
      const minCapacity = parseInt(filters.capacity)
      results = results.filter(event => event.capacity >= minCapacity)
    }
    
    if (filters.priceRange) {
      const maxPrice = parseInt(filters.priceRange)
      results = results.filter(event => event.price <= maxPrice)
    }
    
    setFilteredEvents(results)
  }
  
  const resetFilters = () => {
    setFilters({
      type: '',
      capacity: '',
      priceRange: ''
    })
    setFilteredEvents(events)
  }
  
  const filterBg = useColorModeValue('white', 'gray.800')
  
  return (
    <Box pt={24} pb={16}>
      <Container maxW="1200px">
        <Box mb={8}>
          <Heading as="h1" fontSize={{ base: '2xl', md: '3xl' }} mb={3}>
            Special Events & Venues
          </Heading>
          <Text color="gray.600">
            Discover the perfect venue for your next event, from intimate gatherings to grand celebrations
          </Text>
        </Box>
        
        <Flex 
          gap={8} 
          flexDirection={{ base: 'column', lg: 'row' }}
        >
          {/* Filters */}
          <Box w={{ base: '100%', lg: '300px' }}>
            <Box 
              p={6} 
              borderRadius="lg" 
              bg={filterBg}
              boxShadow="sm"
              position="sticky"
              top="100px"
            >
              <Heading as="h3" fontSize="lg" mb={6}>
                Filter Events
              </Heading>
              
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text mb={2} fontWeight="medium">Event Type</Text>
                  <Select 
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                    placeholder="All Types"
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Conference">Conference</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Gala">Gala</option>
                    <option value="Corporate">Corporate</option>
                  </Select>
                </Box>
                
                <Box>
                  <Text mb={2} fontWeight="medium">Minimum Capacity</Text>
                  <Select 
                    name="capacity"
                    value={filters.capacity}
                    onChange={handleFilterChange}
                    placeholder="Any Capacity"
                  >
                    <option value="50">50+ Guests</option>
                    <option value="100">100+ Guests</option>
                    <option value="200">200+ Guests</option>
                    <option value="300">300+ Guests</option>
                  </Select>
                </Box>
                
                <Box>
                  <Text mb={2} fontWeight="medium">Maximum Budget</Text>
                  <Select 
                    name="priceRange"
                    value={filters.priceRange}
                    onChange={handleFilterChange}
                    placeholder="Any Budget"
                  >
                    <option value="1500">Up to $1,500</option>
                    <option value="3000">Up to $3,000</option>
                    <option value="5000">Up to $5,000</option>
                    <option value="10000">Up to $10,000</option>
                  </Select>
                </Box>
                
                <Button 
                  colorScheme="teal" 
                  leftIcon={<FiFilter />}
                  onClick={applyFilters}
                  mt={2}
                >
                  Apply Filters
                </Button>
                
                <Button 
                  variant="ghost" 
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              </VStack>
            </Box>
          </Box>
          
          {/* Events Grid */}
          <Box flex="1">
            <Flex 
              justify="space-between" 
              align="center" 
              mb={6}
            >
              <Text color="gray.600">
                {filteredEvents.length} events available
              </Text>
              
              <Select 
                maxW="200px"
                placeholder="Sort by"
                size="sm"
              >
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="capacityDesc">Capacity: High to Low</option>
                <option value="capacityAsc">Capacity: Low to High</option>
              </Select>
            </Flex>
            
            {filteredEvents.length === 0 ? (
              <Box 
                textAlign="center" 
                py={10} 
                px={6} 
                bg="gray.50" 
                borderRadius="lg"
              >
                <Heading as="h3" fontSize="lg" mb={2}>
                  No events found
                </Heading>
                <Text color="gray.600">
                  Try adjusting your filters to see more options
                </Text>
              </Box>
            ) : (
              <SimpleGrid 
                columns={{ base: 1, md: 2 }} 
                spacing={6}
              >
                {filteredEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </SimpleGrid>
            )}
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default Events