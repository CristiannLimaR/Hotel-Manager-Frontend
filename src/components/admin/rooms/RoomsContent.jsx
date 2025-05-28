import React, { useState } from "react";
import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Grid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiSearch, FiFilter, FiRefreshCw, FiPlus } from "react-icons/fi";

import useRooms from "../../../shared/hooks/userRooms"; // Adjust path as needed
import RoomCard from "./RoomCard";
import AddEditRoomModal from "./AddEditRoomModal";
import RoomDetailsModal from "./RoomDetailsModal";
import ConfirmationModal from "./ConfirmationModal";

const RoomsContent = () => {
  const {
    filteredRooms,
    searchTerm,
    availabilityFilter,
    typeFilter,
    stateFilter, // Destructure the new stateFilter
    loading,
    error,
    fetchHotelAndRooms,
    handleAddRoom,
    handleEditRoom,
    handleToggleRoomState,
    handleDeleteRoom,
    handleSearch,
    handleAvailabilityFilter,
    handleTypeFilter,
    handleStateFilter, // Destructure the new handler
    rooms, // Also destructure rooms to access individual room state for confirmation
  } = useRooms();

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [roomInQuestion, setRoomInQuestion] = useState(null);
  const [actionType, setActionType] = useState(null);

  const { isOpen: isAddEditModalOpen, onOpen: onOpenAddEditModal, onClose: onCloseAddEditModal } = useDisclosure();
  const { isOpen: isDetailModalOpen, onOpen: onOpenDetailModal, onClose: onCloseDetailModal } = useDisclosure();
  const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure();

  // --- Modal Handlers ---

  const handleOpenAddModal = () => {
    setIsEditing(false);
    setSelectedRoom(null); // Clear selected room for add
    onOpenAddEditModal();
  };

  const handleOpenEditModal = (room) => {
    setIsEditing(true);
    setSelectedRoom(room);
    onOpenAddEditModal();
  };

  const handleSaveRoom = async (uid, roomData) => {
    if (isEditing) {
      return await handleEditRoom(uid, roomData);
    } else {
      return await handleAddRoom(roomData);
    }
  };

  const handleViewDetails = (room) => {
    setSelectedRoom(room);
    onOpenDetailModal();
  };

  const handleConfirmAction = () => {
    if (actionType === "delete" && roomInQuestion) {
      handleDeleteRoom(roomInQuestion);
    } else if (actionType === "toggleState" && roomInQuestion) {
      handleToggleRoomState(roomInQuestion);
    }
    // onCloseConfirm is called by the individual action handlers (handleDeleteRoom, handleToggleRoomState)
  };

  return (
    <Box p={6}>
      <HStack justify="space-between" mb={6} flexWrap="wrap">
        <HStack spacing={3} flexWrap="wrap">
          <InputGroup w={{ base: "full", md: "300px" }}>
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Buscar habitaciones..."
              borderRadius="md"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </InputGroup>
          <Menu>
            <MenuButton as={Button} rightIcon={<FiFilter />} variant="outline">
              Disponibilidad: {availabilityFilter}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleAvailabilityFilter("Todas")}>
                Todas
              </MenuItem>
              <MenuItem onClick={() => handleAvailabilityFilter("Activadas")}>
                Activadas
              </MenuItem>
              <MenuItem onClick={() => handleAvailabilityFilter("Desactivadas")}>
                Desactivadas
              </MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<FiFilter />} variant="outline">
              Tipo: {typeFilter}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleTypeFilter("Todos los Tipos")}>
                Todos los Tipos
              </MenuItem>
              <MenuItem onClick={() => handleTypeFilter("Deluxe")}>
                Deluxe
              </MenuItem>
              <MenuItem onClick={() => handleTypeFilter("Suite")}>
                Suite
              </MenuItem>
              <MenuItem onClick={() => handleTypeFilter("Estándar")}>
                Estándar
              </MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<FiFilter />} variant="outline">
              Estado: {stateFilter}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleStateFilter("Todas")}>
                Todas
              </MenuItem>
              <MenuItem onClick={() => handleStateFilter("Activas")}>
                Activas
              </MenuItem>
              <MenuItem onClick={() => handleStateFilter("Inactivas")}>
                Inactivas
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        <HStack spacing={3} mt={{ base: 4, md: 0 }}>
          <Button
            colorScheme="blue"
            leftIcon={<FiRefreshCw />}
            onClick={fetchHotelAndRooms}
          >
            Recargar Habitaciones
          </Button>
          <Button colorScheme="blue" leftIcon={<FiPlus />} onClick={handleOpenAddModal}>
            Crear Habitación
          </Button>
        </HStack>
      </HStack>

      {loading ? (
        <Text>Cargando habitaciones...</Text>
      ) : error ? (
        <Text color="red.500" fontSize="lg" textAlign="center" py={10}>
          {error}
        </Text>
      ) : filteredRooms.length === 0 ? (
        <Text fontSize="lg" textAlign="center" py={10} color="gray.500">
          No hay habitaciones que coincidan con los filtros aplicados.
        </Text>
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
          {filteredRooms.map((room) => (
            <RoomCard
              key={room.uid}
              room={room}
              onViewDetails={handleViewDetails}
              onEdit={handleOpenEditModal}
              onToggleState={(uid) => {
                setRoomInQuestion(uid);
                setActionType("toggleState");
                onOpenConfirm();
              }}
              onDelete={(uid) => {
                setRoomInQuestion(uid);
                setActionType("delete");
                onOpenConfirm();
              }}
            />
          ))}
        </Grid>
      )}

      <AddEditRoomModal
        isOpen={isAddEditModalOpen}
        onClose={onCloseAddEditModal}
        roomToEdit={selectedRoom}
        onSave={handleSaveRoom}
      />

      <RoomDetailsModal
        isOpen={isDetailModalOpen}
        onClose={onCloseDetailModal}
        room={selectedRoom}
      />

      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={onCloseConfirm}
        actionType={actionType}
        roomInQuestion={roomInQuestion}
        onConfirm={handleConfirmAction}
        roomState={rooms.find(r => r.uid === roomInQuestion)?.state} // Pass the specific room's state
      />
    </Box>
  );
};

export default RoomsContent;