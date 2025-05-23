import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  Avatar,
  Badge,
} from "@chakra-ui/react";
import { FiSearch, FiUser } from "react-icons/fi";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import useUsers from "../../shared/hooks/useUsers";

const AdminSearch = ({ onSelect, selectedAdmin = null }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const { getManagers, isLoading } = useUsers();

  const fetchAdmins = async () => {
    const response = await getManagers();
    setAdmins(response);
  }

  // Datos de ejemplo - Esto debería venir de tu API
  useEffect(() => {
    fetchAdmins();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredAdmins(admins);
    } else {
      const filtered = admins.filter(
        (admin) =>
          admin.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          admin.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAdmins(filtered);
    }
  }, [searchTerm, admins]);

  const handleSelect = (admin) => {
    onSelect(admin);
    onClose();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "activo":
        return "green";
      case "inactivo":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <Box>
      <Button
        onClick={onOpen}
        leftIcon={<FiUser />}
        variant="outline"
        w="full"
        justifyContent="flex-start"
      >
        {selectedAdmin ? (
          <HStack>
            <Avatar size="sm" name={selectedAdmin.nombre} />
            <Text>{selectedAdmin.nombre}</Text>
          </HStack>
        ) : (
          "Seleccionar Administrador"
        )}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Buscar Administrador</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} align="stretch">
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FiSearch color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Buscar por nombre o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>

              <List spacing={3}>
                {filteredAdmins.map((admin) => (
                  <ListItem
                    key={admin._id}
                    p={3}
                    borderWidth={1}
                    borderRadius="md"
                    cursor="pointer"
                    _hover={{ bg: "gray.50" }}
                    onClick={() => handleSelect(admin)}
                  >
                    <HStack justify="space-between">
                      <HStack>
                        <Avatar size="sm" name={admin.nombre} />
                        <Box>
                          <Text fontWeight="medium">{admin.nombre}</Text>
                          <Text fontSize="sm" color="gray.500">
                            {admin.email}
                          </Text>
                        </Box>
                      </HStack>
                      <VStack align="end" spacing={1}>
                        <Badge colorScheme={getStatusColor(admin.status)}>
                          {admin.status}
                        </Badge>
                      </VStack>
                    </HStack>
                  </ListItem>
                ))}
              </List>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

AdminSearch.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selectedAdmin: PropTypes.shape({
    id: PropTypes.string,
    nombre: PropTypes.string,
    email: PropTypes.string,
    status: PropTypes.string,
  }),
};

export default AdminSearch; 