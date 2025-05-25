import { 
  Box, 
  Container, 
  SimpleGrid, 
  Stack, 
  Text, 
  Flex, 
  Link, 
  Heading, 
  Input, 
  Button, 
  HStack, 
  Image,
  VStack,
  IconButton
} from '@chakra-ui/react'
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube } from 'react-icons/fi'
import { Link as RouterLink } from 'react-router-dom'
import { BedDoubleIcon } from 'lucide-react'

const ListHeader = ({ children }) => {
  return (
    <Heading as="h4" fontSize="lg" fontWeight="bold" mb={2} color="gray.700">
      {children}
    </Heading>
  )
}

function Footer() {
  return (
    <Box bg="gray.50" color="gray.700">
      <Container as={Stack} maxW="1200px" py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack spacing={6}>
            <Flex alignItems="center">
              <BedDoubleIcon size={32} />
              <Text fontSize="lg" fontWeight="bold" ml={2}>QuickStay</Text>
            </Flex>
            <Text fontSize="sm">
              Ofrecemos lugares lujosos y extraordinarios para hospedarse, desde hoteles boutique hasta villas de lujo y retiros privados.
            </Text>
            <HStack spacing={4}>
              <IconButton
                aria-label="Instagram"
                icon={<FiInstagram />}
                size="sm"
                colorScheme="gray"
                variant="ghost"
                rounded="full"
              />
              <IconButton
                aria-label="Twitter"
                icon={<FiTwitter />}
                size="sm"
                colorScheme="gray"
                variant="ghost"
                rounded="full"
              />
              <IconButton
                aria-label="Facebook"
                icon={<FiFacebook />}
                size="sm"
                colorScheme="gray"
                variant="ghost"
                rounded="full"
              />
              <IconButton
                aria-label="YouTube"
                icon={<FiYoutube />}
                size="sm"
                colorScheme="gray"
                variant="ghost"
                rounded="full"
              />
            </HStack>
          </Stack>
          
          <Stack align="flex-start">
            <ListHeader>Empresa</ListHeader>
            <Link as={RouterLink} to="/about">Acerca de</Link>
            <Link as={RouterLink} to="/careers">Carreras</Link>
            <Link as={RouterLink} to="/press">Prensa</Link>
            <Link as={RouterLink} to="/blog">Blog</Link>
            <Link as={RouterLink} to="/partners">Socios</Link>
          </Stack>
          
          <Stack align="flex-start">
            <ListHeader>Soporte</ListHeader>
            <Link as={RouterLink} to="/help-center">Centro de Ayuda</Link>
            <Link as={RouterLink} to="/safety">Información de Seguridad</Link>
            <Link as={RouterLink} to="/cancellation">Opciones de Cancelación</Link>
            <Link as={RouterLink} to="/covid">Respuesta COVID-19</Link>
            <Link as={RouterLink} to="/accessibility">Accesibilidad</Link>
          </Stack>
          
          <Stack align="flex-start">
            <ListHeader>Stay Updated</ListHeader>
            <Text fontSize="sm">
              Join our newsletter to be the first to discover new destinations, exclusive offers, and travel inspiration.
            </Text>
            <VStack spacing={2} w="100%">
              <Input 
                placeholder="Enter your email" 
                bg="white" 
                border="1px" 
                borderColor="gray.300"
                _focus={{
                  borderColor: 'brand.500',
                }}
              />
              <Button
                w="100%"
                bg="brand.500"
                color="white"
                _hover={{
                  bg: 'brand.600',
                }}
              >
                Subscribe
              </Button>
            </VStack>
            <Text fontSize="xs" color="gray.500">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </Text>
          </Stack>
        </SimpleGrid>
      </Container>
      
      <Box py={4} borderTopWidth={1} borderColor="gray.200">
        <Container 
          maxW="1200px"
          display="flex"
          flexDirection={{ base: 'column', md: 'row' }}
          alignItems={{ base: 'center', md: 'center' }}
          justifyContent={{ base: 'center', md: 'space-between' }}
          textAlign={{ base: 'center', md: 'left' }}
        >
          <Text fontSize="sm" color="gray.500">
            © 2025 QuickStay. Todos los derechos reservados.
          </Text>
          <HStack spacing={6} mt={{ base: 4, md: 0 }}>
            <Link as={RouterLink} to="/privacy" fontSize="sm" color="gray.500">Privacidad</Link>
            <Link as={RouterLink} to="/terms" fontSize="sm" color="gray.500">Términos</Link>
            <Link as={RouterLink} to="/sitemap" fontSize="sm" color="gray.500">Mapa del Sitio</Link>
          </HStack>
        </Container>
      </Box>
    </Box>
  )
}

export default Footer