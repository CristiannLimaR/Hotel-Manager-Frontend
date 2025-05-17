import { useState } from 'react'
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  FormControl, 
  FormLabel, 
  Input, 
  Button, 
  VStack, 
  HStack, 
  Checkbox, 
  Divider, 
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
  FormHelperText
} from '@chakra-ui/react'
import { FiEye, FiEyeOff, FiCheck, FiX } from 'react-icons/fi'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const navigate = useNavigate()
  const toast = useToast()
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }
  
  const passwordRequirements = [
    { text: 'At least 8 characters', met: formData.password.length >= 8 },
    { text: 'At least one uppercase letter', met: /[A-Z]/.test(formData.password) },
    { text: 'At least one number', met: /[0-9]/.test(formData.password) },
    { text: 'Passwords match', met: formData.password && formData.password === formData.confirmPassword }
  ]
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    
    if (!formData.agreeTerms) {
      toast({
        title: 'Error',
        description: 'Please agree to the terms and conditions',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      
      toast({
        title: 'Registration Successful',
        description: 'Your account has been created successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      
      navigate('/login')
    }, 1500)
  }
  
  return (
    <Box pt={24} pb={16}>
      <Container maxW="600px">
        <Box 
          p={8} 
          borderWidth="1px" 
          borderRadius="lg" 
          boxShadow="md"
        >
          <VStack spacing={6} align="stretch">
            <Box textAlign="center">
              <Heading as="h1" size="xl" mb={2}>
                Create an Account
              </Heading>
              <Text color="gray.600">
                Join QuickStay to get exclusive deals and manage your bookings
              </Text>
            </Box>
            
            <Box as="form" onSubmit={handleSubmit}>
              <VStack spacing={4} align="stretch">
                <HStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  
                  <FormControl isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </HStack>
                
                <FormControl isRequired>
                  <FormLabel>Email Address</FormLabel>
                  <Input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input 
                      type={showPassword ? 'text' : 'password'} 
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        icon={showPassword ? <FiEyeOff /> : <FiEye />}
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup>
                    <Input 
                      type={showConfirmPassword ? 'text' : 'password'} 
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        icon={showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                
                <Box>
                  <Text fontWeight="medium" fontSize="sm" mb={2}>
                    Password Requirements:
                  </Text>
                  <VStack align="start" spacing={1}>
                    {passwordRequirements.map((req, index) => (
                      <HStack key={index} color={req.met ? 'green.500' : 'gray.500'}>
                        <Box>{req.met ? <FiCheck /> : <FiX />}</Box>
                        <Text fontSize="sm">{req.text}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
                
                <FormControl>
                  <Checkbox 
                    name="agreeTerms"
                    isChecked={formData.agreeTerms}
                    onChange={handleInputChange}
                  >
                    I agree to the{' '}
                    <Text as="span" color="brand.500">
                      Terms of Service
                    </Text>{' '}
                    and{' '}
                    <Text as="span" color="brand.500">
                      Privacy Policy
                    </Text>
                  </Checkbox>
                </FormControl>
                
                <Button 
                  type="submit" 
                  colorScheme="teal" 
                  size="lg" 
                  w="100%"
                  mt={2}
                  isLoading={isLoading}
                  loadingText="Creating Account"
                >
                  Create Account
                </Button>
              </VStack>
            </Box>
            
            <Divider />
            
            <Box textAlign="center">
              <Text>
                Already have an account?{' '}
                <Text 
                  as={RouterLink} 
                  to="/login" 
                  color="brand.500" 
                  fontWeight="medium"
                >
                  Sign In
                </Text>
              </Text>
            </Box>
          </VStack>
        </Box>
      </Container>
    </Box>
  )
}

export default Register