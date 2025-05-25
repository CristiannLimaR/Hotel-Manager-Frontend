import { 
  Box, 
  Image, 
  Heading, 
  Text, 
  Badge, 
  Button, 
  Flex, 
  useColorModeValue 
} from '@chakra-ui/react'
import { FiArrowRight } from 'react-icons/fi'

function OfferCard({ offer }) {
  const { 
    id, 
    title, 
    description, 
    image, 
    discount, 
    discountType, 
    expireDate 
  } = offer
  
  const cardBg = useColorModeValue('white', 'gray.800')
  const badgeBg = useColorModeValue('accent.500', 'accent.400')
  
  return (
    <Box 
      borderRadius="lg" 
      overflow="hidden" 
      bg={cardBg} 
      boxShadow="md"
      transition="all 0.3s"
      position="relative"
      _hover={{ 
        transform: 'translateY(-4px)', 
        boxShadow: 'lg' 
      }}
    >
      <Box position="relative">
        <Image 
          src={image} 
          alt={title} 
          h="200px" 
          w="100%" 
          objectFit="cover" 
        />
        <Badge 
          position="absolute" 
          top={4} 
          left={4} 
          py={1} 
          px={3} 
          bg={badgeBg} 
          color="white" 
          borderRadius="full" 
          fontWeight="medium"
        >
          {discount}% OFF
        </Badge>
      </Box>
      
      <Box p={5}>
        <Heading 
          fontSize={{ base: 'lg', md: 'xl' }} 
          fontWeight="bold" 
          mb={2}
        >
          {title}
        </Heading>
        
        <Text 
          color="gray.600" 
          fontSize="sm" 
          mb={4}
          noOfLines={2}
        >
          {description}
        </Text>
        
        <Flex 
          justify="space-between" 
          align="center" 
          mt={3}
        >
          <Text fontSize="sm" color="gray.500">
            Expira {new Date(expireDate).toLocaleDateString()}
          </Text>
          
          <Button 
            rightIcon={<FiArrowRight />} 
            variant="ghost" 
            color="brand.500" 
            _hover={{ bg: 'brand.50' }}
            size="sm"
          >
            Ver Ofertas
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}

export default OfferCard