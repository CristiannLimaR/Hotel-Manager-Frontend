import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  actionType,
  roomInQuestion,
  onConfirm,
  roomState, // Pass roomState to determine button color
}) => {
  const getHeader = () => {
    if (actionType === "delete") return "Confirmar Eliminación";
    if (actionType === "toggleState") return "Confirmar Cambio de Estado";
    return "";
  };

  const getBody = () => {
    if (actionType === "delete" && roomInQuestion) {
      return (
        <Text>
          ¿Estás seguro de que deseas **eliminar** la habitación con ID:{" "}
          <Text as="span" fontWeight="bold">
            {roomInQuestion.uid}
          </Text>
          ? Esta acción es irreversible.
        </Text>
      );
    }
    if (actionType === "toggleState" && roomInQuestion) {
      return (
        <Text>
          ¿Estás seguro de que deseas{" "}
          <Text as="span" fontWeight="bold">
            {roomState ? "desactivar" : "activar"}
          </Text>{" "}
          la habitación con ID:{" "}
          <Text as="span" fontWeight="bold">
            {roomInQuestion.uid}
          </Text>
          ?
        </Text>
      );
    }
    return null;
  };

  const getConfirmButtonColorScheme = () => {
    if (actionType === "delete") return "red";
    if (actionType === "toggleState") return roomState ? "orange" : "green";
    return "blue";
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{getHeader()}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{getBody()}</ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            colorScheme={getConfirmButtonColorScheme()}
            ml={3}
            onClick={onConfirm}
          >
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;