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
            alt="Página No Encontrada" 
            w="300px" 
            borderRadius="md" 
            boxShadow="md"
          />
          
          <Heading as="h2" size="xl" mt={2}>
            Página No Encontrada
          </Heading>
          
          <Text fontSize="lg" maxW="500px" mx="auto" color="gray.600">
            ¡Ups! La página que buscas parece haberse ido temprano.
          </Text>
          
          <Text fontSize="lg" maxW="500px" mx="auto" color="gray.600">
            Volvamos a explorar nuestras increíbles opciones de hoteles.
          </Text>
          
          <Button 
            as={RouterLink} 
            to="/" 
            colorScheme="teal" 
            size="lg" 
            mt={4}
          >
            Volver al Inicio
          </Button>
        </VStack>
      </Container>
    </Box>
  )
}

export default NotFound