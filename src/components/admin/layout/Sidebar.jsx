import { Box, Flex, Icon, Text, Heading, VStack, Divider, useColorModeValue } from "@chakra-ui/react";
import {
  FiHome,
  FiCalendar,
  FiGrid,
  FiUsers,
  FiDollarSign,
  FiList,
  FiBarChart2,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";
import { BarChart } from "recharts";

const NavItem = ({ icon, children, id, activeNavItem, setActiveNavItem, as, to }) => {
  const bg = useColorModeValue("white", "gray.800");
  
  const Component = as || Flex;
  
  return (
    <Component
      as={as}
      to={to}
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
      onClick={() => !as && setActiveNavItem(id)}
    >
      <Icon as={icon} mr="4" fontSize="18" />
      <Text fontSize="sm">{children}</Text>
    </Component>
  );
};

const Sidebar = ({ activeNavItem, setActiveNavItem }) => {
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
        <Heading size="md" color="blue.500">Hotel Admin Panel</Heading>
      </Flex>
      <VStack spacing={0} align="stretch">
        <NavItem icon={FiHome} id="Dashboard" activeNavItem={activeNavItem} setActiveNavItem={setActiveNavItem}>
          Dashboard
        </NavItem>
        <NavItem icon={FiCalendar} id="Reservations" activeNavItem={activeNavItem} setActiveNavItem={setActiveNavItem}>
          Reservations
        </NavItem>
        <NavItem icon={FiGrid} id="Rooms" activeNavItem={activeNavItem} setActiveNavItem={setActiveNavItem}>
          Rooms
        </NavItem>
        <NavItem icon={FiUsers} id="Events" activeNavItem={activeNavItem} setActiveNavItem={setActiveNavItem}>
          Events
        </NavItem>
        <NavItem icon={FiDollarSign} id="Invoices" activeNavItem={activeNavItem} setActiveNavItem={setActiveNavItem}>
          Invoices
        </NavItem>
        <NavItem icon={FiList} id="Services" activeNavItem={activeNavItem} setActiveNavItem={setActiveNavItem}>
          Services
        </NavItem>
        <NavItem icon={BarChart} id="Reportes" activeNavItem={activeNavItem} setActiveNavItem={setActiveNavItem}>
          Reportes
        </NavItem>
      </VStack>
    </Box>
  );
};

export default Sidebar; 