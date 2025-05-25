import {
  Flex,
  HStack,
  Heading,
  Button,
  Avatar,
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";
import useAuthStore from "../../../shared/stores/authStore";
import useLogin from "../../../shared/hooks/useLogin";

const Header = ({ activeNavItem }) => {
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const  user = useAuthStore((state) => state.user);
  const { logout } = useLogin();
  return (
    <Flex
      bg={bg}
      p="4"
      borderBottom="1px"
      borderColor={borderColor}
      justify="space-between"
      align="center"
      mb="4"
    >
      <Heading size="md">
        {activeNavItem}
      </Heading>
      <HStack spacing="4">
        <Menu>
          <MenuButton as={Button} rightIcon={<FiChevronDown />} variant="ghost">
            <HStack>
            <Avatar
                  size="sm"
                  name={user?.nombre}
                  src={user?.avatar}
                />
              <Box textAlign="left">
                <Text fontWeight="bold" fontSize="sm">Hotel Manager</Text>
                <Text fontSize="xs" color="gray.500">{user.email}</Text>
              </Box>
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem as={RouterLink} to="/profile">Perfil</MenuItem>
            <MenuItem as={RouterLink} to="/">Ir al Inicio</MenuItem>
            <MenuItem onClick={logout}>Cerrar Sesión</MenuItem>
            
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default Header; 