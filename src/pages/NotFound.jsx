import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Button, 
  VStack, 
  Image 
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

function NotFound() {
  return (
    <Box pt={24} pb={16} textAlign="center">
      <Container maxW="1200px">
        <VStack spacing={6}>
          <Heading as="h1" size="2xl">
            404
          </Heading>
          
          <Image 
            src="https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Page Not Found" 
            w="300px" 
            borderRadius="md" 
            boxShadow="md"
          />
          
          <Heading as="h2" size="xl" mt={2}>
            Page Not Found
          </Heading>
          
          <Text fontSize="lg" maxW="500px" mx="auto" color="gray.600">
            Oops! The page you're looking for seems to have checked out early.
          </Text>
          
          <Text fontSize="lg" maxW="500px" mx="auto" color="gray.600">
            Let's get you back to exploring our amazing hotel options.
          </Text>
          
          <Button 
            as={RouterLink} 
            to="/" 
            colorScheme="teal" 
            size="lg" 
            mt={4}
          >
            Return to Homepage
          </Button>
        </VStack>
      </Container>
    </Box>
  )
}

export default NotFound