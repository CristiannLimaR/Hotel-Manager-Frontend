import { 
  Box, 
  Flex, 
  Text, 
  Avatar, 
  Icon, 
  useColorModeValue 
} from '@chakra-ui/react'
import { FiStar } from 'react-icons/fi'

function TestimonialCard({ testimonial }) {
  const { 
    id, 
    name, 
    location, 
    rating, 
    comment, 
    image 
  } = testimonial
  
  const cardBg = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.700', 'gray.200')
  
  return (
    <Box 
      bg={cardBg} 
      p={6} 
      borderRadius="lg" 
      boxShadow="md"
      transition="all 0.3s"
      _hover={{ 
        transform: 'translateY(-4px)', 
        boxShadow: 'lg' 
      }}
    >
      <Flex mb={4}>
        {[...Array(5)].map((_, i) => (
          <Icon 
            key={i} 
            as={FiStar} 
            color={i < rating ? 'accent.500' : 'gray.300'} 
            fillOpacity={i < rating ? 1 : 0}
            fill={i < rating ? 'accent.500' : 'none'}
            stroke={i < rating ? 'accent.500' : 'gray.300'}
            mr={1} 
          />
        ))}
      </Flex>
      
      <Text color={textColor} fontSize="sm" mb={6} lineHeight="1.6" fontStyle="italic">
        "{comment}"
      </Text>
      
      <Flex align="center">
        <Avatar 
          src={image} 
          name={name} 
          size="sm" 
          mr={3} 
        />
        <Box>
          <Text fontWeight="medium" fontSize="sm">
            {name}
          </Text>
          <Text color="gray.500" fontSize="xs">
            {location}
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}

export default TestimonialCard