import { useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Select,
  Button,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Stack,
} from "@chakra-ui/react";
import { Card } from "@chakra-ui/react";

const UsersContent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Datos de ejemplo
  const users = [
    { id: 1, name: "Juan Pérez", email: "juan@example.com", role: "admin", status: "activo" },
    { id: 2, name: "María García", email: "maria@example.com", role: "hotel_admin", status: "activo" },
    // ... más usuarios
  ];

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading>Gestión de Usuarios</Heading>
        <Button colorScheme="blue" onClick={onOpen}>
          Nuevo Usuario
        </Button>
      </Flex>

      <Card>
        <Flex gap={4} mb={4}>
          <Input
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            maxW="300px"
          />
          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            maxW="200px"
          >
            <option value="all">Todos los roles</option>
            <option value="admin">Administrador</option>
            <option value="hotel_admin">Admin de Hotel</option>
            <option value="user">Usuario</option>
          </Select>
        </Flex>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nombre</Th>
              <Th>Email</Th>
              <Th>Rol</Th>
              <Th>Estado</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.role}</Td>
                <Td>{user.status}</Td>
                <Td>
                  <Button size="sm" colorScheme="blue" mr={2}>
                    Editar
                  </Button>
                  <Button size="sm" colorScheme="red">
                    Eliminar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Card>

      {/* Modal para nuevo usuario */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nuevo Usuario</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Input placeholder="Nombre completo" />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="correo@ejemplo.com" />
              </FormControl>
              <FormControl>
                <FormLabel>Rol</FormLabel>
                <Select>
                  <option value="admin">Administrador</option>
                  <option value="hotel_admin">Admin de Hotel</option>
                  <option value="user">Usuario</option>
                </Select>
              </FormControl>
              <Button colorScheme="blue" mr={3}>
                Guardar
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UsersContent; 