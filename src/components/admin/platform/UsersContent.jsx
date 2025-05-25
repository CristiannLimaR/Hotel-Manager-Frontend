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

  // Para el modal de confirmación de eliminación
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [userToDelete, setUserToDelete] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Datos de ejemplo
  const [users, setUsers] = useState([
    { id: 1, name: "Juan Pérez", email: "juan@example.com", role: "admin", status: "activo" },
    { id: 2, name: "María García", email: "maria@example.com", role: "hotel_admin", status: "activo" },
    // ... más usuarios
  ]);

  // crear/editar usuario
  const [editingUser, setEditingUser] = useState(null);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formRole, setFormRole] = useState("user");

  //modal para nuevo usuario
  const handleNewUser = () => {
    setEditingUser(null);
    setFormName("");
    setFormEmail("");
    setFormRole("user");
    onOpen();
  };

  // modal para editar usuario
  const handleEditClick = (user) => {
    setEditingUser(user);
    setFormName(user.name);
    setFormEmail(user.email);
    setFormRole(user.role);
    onOpen();
  };

  // Guardar usuario (crear o editar)
  const handleSave = () => {
    if (editingUser) {
      // Editar usuario existente
      setUsers(users.map(u =>
        u.id === editingUser.id
          ? { ...u, name: formName, email: formEmail, role: formRole }
          : u
      ));
    } else {
      // Crear nuevo usuario
      const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
      setUsers([
        ...users,
        {
          id: newId,
          name: formName,
          email: formEmail,
          role: formRole,
          status: "activo",
        },
      ]);
    }
    onClose();
  };

  // Abrir modal de confirmación de eliminación
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    onDeleteOpen();
  };

  // Eliminar usuario
  const handleDelete = () => {
    setUsers(users.filter((user) => user.id !== userToDelete.id));
    setUserToDelete(null);
    onDeleteClose();
  };

  // Filtrado (Funcional)
  const filteredUsers = users.filter(user =>
    (roleFilter === "all" || user.role === roleFilter) &&
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading>Gestión de Usuarios</Heading>
        <Button colorScheme="blue" onClick={handleNewUser}>
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
            {filteredUsers.map((user) => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.role}</Td>
                <Td>{user.status}</Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    mr={2}
                    onClick={() => handleEditClick(user)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDeleteClick(user)}
                  >
                    Eliminar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Card>

      {/* Modal para crear/editar usuario */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingUser ? "Editar Usuario" : "Nuevo Usuario"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Input
                  placeholder="Nombre completo"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Rol</FormLabel>
                <Select
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value)}
                >
                  <option value="admin">Administrador</option>
                  <option value="hotel_admin">Admin de Hotel</option>
                  <option value="user">Usuario</option>
                </Select>
              </FormControl>
              <Button colorScheme="blue" mr={3} onClick={handleSave}>
                Guardar
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modal de confirmación de eliminación */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmar eliminación</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            ¿Estás seguro de que deseas eliminar al usuario{" "}
            <b>{userToDelete?.name}</b>?
          </ModalBody>
          <Flex justify="flex-end" p={4} pt={0}>
            <Button onClick={onDeleteClose} mr={3}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={handleDelete}>
              Eliminar
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UsersContent;