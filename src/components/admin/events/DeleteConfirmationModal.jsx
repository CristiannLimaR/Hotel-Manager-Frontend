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

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
      <ModalOverlay bg="blackAlpha.600" />
      <ModalContent borderRadius="xl" boxShadow="lg" p={4}>
        <ModalHeader
          fontWeight="extrabold"
          textTransform="uppercase"
          letterSpacing="wider"
          color="red.600"
        >
          Confirmar eliminación
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody fontSize="lg" color="gray.700" pb={6}>
          <Text>
            ¿Estás seguro de que deseas eliminar este evento? Esta acción no se puede
            deshacer.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            onClick={onConfirm}
            size="md"
            fontWeight="bold"
            textTransform="uppercase"
            boxShadow="md"
            _hover={{ bg: "red.700" }}
          >
            Eliminar
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            size="md"
            fontWeight="bold"
            _hover={{ bg: "gray.100" }}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmationModal;