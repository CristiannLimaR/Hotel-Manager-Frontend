import { useState } from 'react'
import { 
  Box, 
  Input, 
  Button, 
  InputGroup, 
  InputLeftElement, 
  FormControl, 
  FormLabel,
  Grid,
  GridItem,
  Select
} from '@chakra-ui/react'
import { FiMapPin, FiCalendar, FiUsers, FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

function SearchBar() {
  const [searchParams, setSearchParams] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: '2'
  })
  
  const navigate = useNavigate()
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSearchParams({
      ...searchParams,
      [name]: value
    })
  }
  
  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/hotels', { state: { ...searchParams } })
  }

  return (
    <Box as="form" onSubmit={handleSearch}>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' }}
        gap={4}
      >
        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel fontWeight="medium" fontSize="sm">Destination</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FiMapPin color="gray.300" />
              </InputLeftElement>
              <Input 
                name="destination"
                placeholder="Where to?" 
                value={searchParams.destination}
                onChange={handleInputChange}
              />
            </InputGroup>
          </FormControl>
        </GridItem>
        
        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel fontWeight="medium" fontSize="sm">Check in</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FiCalendar color="gray.300" />
              </InputLeftElement>
              <Input 
                name="checkIn"
                type="date" 
                value={searchParams.checkIn}
                onChange={handleInputChange}
              />
            </InputGroup>
          </FormControl>
        </GridItem>
        
        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel fontWeight="medium" fontSize="sm">Check out</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FiCalendar color="gray.300" />
              </InputLeftElement>
              <Input 
                name="checkOut"
                type="date" 
                value={searchParams.checkOut}
                onChange={handleInputChange}
              />
            </InputGroup>
          </FormControl>
        </GridItem>
        
        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel fontWeight="medium" fontSize="sm">Guests</FormLabel>
            <Box display="flex">
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FiUsers color="gray.300" />
                </InputLeftElement>
                <Select 
                  name="guests"
                  value={searchParams.guests}
                  onChange={handleInputChange}
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5+ Guests</option>
                </Select>
              </InputGroup>
              <Button 
                type="submit"
                ml={2}
                colorScheme="teal"
                bg="brand.500"
                _hover={{ bg: 'brand.600' }}
                px={6}
              >
                <FiSearch />
              </Button>
            </Box>
          </FormControl>
        </GridItem>
      </Grid>
    </Box>
  )
}

export default SearchBar