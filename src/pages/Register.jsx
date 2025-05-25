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
  HStack, 
  Divider, 
  InputGroup,
  InputRightElement,
  IconButton,
  FormHelperText,
  FormErrorMessage
} from '@chakra-ui/react'
import { FiEye, FiEyeOff, FiCheck, FiX } from 'react-icons/fi'
import { Link as RouterLink} from 'react-router-dom'
import { useRegister } from '../shared/hooks/useRegister'
function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { registerUser,  isRegisterLoading } = useRegister()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      nombre: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    mode: 'onBlur'
  })

  const password = watch('password')
  
  const passwordRequirements = [
    { text: 'At least 8 characters', met: password?.length >= 8 },
    { text: 'At least one uppercase letter', met: /[A-Z]/.test(password) },
    { text: 'At least one number', met: /[0-9]/.test(password) },
    { text: 'Passwords match', met: password && password === watch('confirmPassword') }
  ]

  const onSubmit = async (data) => {
    console.log(data)
    await registerUser(data)
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
            
            <Box as="form" onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={4} align="stretch">
                <FormControl isRequired isInvalid={errors.nombre}>
                  <FormLabel>First Name</FormLabel>
                  <Input 
                    {...register('nombre', { 
                      required: 'First name is required',
                      minLength: {
                        value: 2,
                        message: 'First name must be at least 2 characters'
                      }
                    })}
                  />
                  <FormErrorMessage>
                    {errors.nombre && errors.nombre.message}
                  </FormErrorMessage>
                </FormControl>
                
                <FormControl isRequired isInvalid={errors.email}>
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
                  <FormHelperText>We&apos;ll never share your email.</FormHelperText>
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                
                <FormControl isRequired isInvalid={errors.password}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input 
                      type={showPassword ? 'text' : 'password'} 
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters'
                        },
                        pattern: {
                          value: /^(?=.*[A-Z])(?=.*\d).*$/,
                          message: 'Password must contain at least one uppercase letter and one number'
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
                
                <FormControl isRequired isInvalid={errors.confirmPassword}>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup>
                    <Input 
                      type={showConfirmPassword ? 'text' : 'password'} 
                      {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: value => 
                          value === password || 'The passwords do not match'
                      })}
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
                  <FormErrorMessage>
                    {errors.confirmPassword && errors.confirmPassword.message}
                  </FormErrorMessage>
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
                
                <Button 
                  type="submit" 
                  colorScheme="teal" 
                  size="lg" 
                  w="100%"
                  mt={2}
                  isLoading={isRegisterLoading}
                  loadingText="Creando Cuenta"
                >
                  Crear Cuenta
                </Button>
              </VStack>
            </Box>
            
            <Divider />
            
            <Box textAlign="center">
              <Text>
                ¿Ya tienes una cuenta?{' '}
                <Text 
                  as={RouterLink} 
                  to="/login" 
                  color="brand.500" 
                  fontWeight="medium"
                >
                  Iniciar Sesión
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