import { Box, Flex, Icon, Text, Heading, VStack, Divider, useColorModeValue } from "@chakra-ui/react";
import { BarChart, LogOutIcon, Settings, HomeIcon, UserIcon, HotelIcon } from "lucide-react";


const NavItem = ({ icon, children, id, activeNavItem, setActiveNavItem }) => {
  const bg = useColorModeValue("white", "gray.800");
  
  return (
    <Flex
      align="center"
      px="4"
      py="3"
      cursor="pointer"
      role="group"
      fontWeight={activeNavItem === id ? "bold" : "normal"}
      bg={activeNavItem === id ? "blue.50" : "transparent"}
      color={activeNavItem === id ? "blue.500" : "inherit"}
      borderLeft={activeNavItem === id ? "4px solid" : "none"}
      borderColor="blue.500"
      _hover={{
        bg: "blue.50",
        color: "blue.500",
      }}
      onClick={() => setActiveNavItem(id)}
    >
      <Icon as={icon} mr="4" fontSize="18" />
      <Text fontSize="sm">{children}</Text>
    </Flex>
  );
};

const SidebarPlatform = ({ activeNavItem, setActiveNavItem }) => {
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      w="64"
      bg={bg}
      borderRight="1px"
      borderColor={borderColor}
      pos="fixed"
      h="full"
    >
      <Flex h="20" alignItems="center" justifyContent="center">
        <Heading size="md" color="blue.500">Platform Admin Panel</Heading>
      </Flex>
      <VStack spacing={0} align="stretch">
        <NavItem icon={HomeIcon} id="Dashboard" activeNavItem={activeNavItem} setActiveNavItem={setActiveNavItem}>
          Dashboard
        </NavItem>
        <NavItem icon={UserIcon} id="Usuarios" activeNavItem={activeNavItem} setActiveNavItem={setActiveNavItem}>
          Usuarios
        </NavItem>
        <NavItem icon={HotelIcon} id="Hoteles" activeNavItem={activeNavItem} setActiveNavItem={setActiveNavItem}>
          Hoteles
        </NavItem>
        <NavItem icon={BarChart} id="Reportes" activeNavItem={activeNavItem} setActiveNavItem={setActiveNavItem}>
          Reportes
        </NavItem>
        <Divider my={2} />
      </VStack>
    </Box>
  );
};

export default SidebarPlatform; 