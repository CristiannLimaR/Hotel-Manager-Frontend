import { useState } from 'react'
import { useForm } from 'react-hook-form'
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
  Divider, 
  InputGroup,
  InputRightElement,
  IconButton,
  FormErrorMessage
} from '@chakra-ui/react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { Link as RouterLink } from 'react-router-dom'
import useLogin from '../shared/hooks/useLogin'
function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useLogin()
  
  const { register, handleSubmit, formState: { errors } } = useForm()
  
  const onSubmit = async (data) => {
    await login(data)
    
  }
  
  return (
    <Box pt={24} pb={16}>
      <Container maxW="500px">
        <Box 
          p={8} 
          borderWidth="1px" 
          borderRadius="lg" 
          boxShadow="md"
        >
          <VStack spacing={6} align="stretch">
            <Box textAlign="center">
              <Heading as="h1" size="xl" mb={2}>
                Welcome Back
              </Heading>
              <Text color="gray.600">
                Sign in to manage your bookings
              </Text>
            </Box>
            
            <Box as="form" onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={4} align="stretch">
                <FormControl isInvalid={errors.email} isRequired>
                  <FormLabel>Email Address</FormLabel>
                  <Input 
                    type="email" 
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                
                <FormControl isInvalid={errors.password} isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input 
                      type={showPassword ? 'text' : 'password'} 
                      {...register('password', { 
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters'
                        }
                      })}
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
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
                
                <Button 
                  type="submit" 
                  colorScheme="teal" 
                  size="lg" 
                  w="100%"
                  mt={2}
                  isLoading={isLoading}
                  loadingText="Signing In"
                >
                  Sign In
                </Button>
              </VStack>
            </Box>
            
            <Divider />
            
            <Box textAlign="center">
              <Text>
                ¿No tienes una cuenta?{' '}
                <Text 
                  as={RouterLink} 
                  to="/register" 
                  color="brand.500" 
                  fontWeight="medium"
                >
                  Regístrate
                </Text>
              </Text>
            </Box>
          </VStack>
        </Box>
      </Container>
    </Box>
  )
}

export default Login