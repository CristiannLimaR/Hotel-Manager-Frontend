import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  SimpleGrid,
  IconButton,
  useDisclosure,
  VStack,
  Text,
} from "@chakra-ui/react";
import { FiX, FiMaximize2 } from "react-icons/fi";
import { useState } from "react";
import PropTypes from 'prop-types';

const HotelGallery = ({ images = [], onImagesChange }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(null);
  const { isOpen: isFullscreenOpen, onOpen: onFullscreenOpen, onClose: onFullscreenClose } = useDisclosure();

  const handleImageClick = (image) => {
    setSelectedImage(image);
    onOpen();
  };


  const handleRemoveImage = (indexToRemove) => {
    if (onImagesChange) {
      onImagesChange(images.filter((_, index) => index !== indexToRemove));
    }
  };

  return (
    <Box>
      <VStack spacing={4} align="stretch">
        {images.length === 0 ? (
          <Text textAlign="center" color="gray.500">
            No hay imágenes disponibles
          </Text>
        ) : (
          <SimpleGrid columns={[2, 3, 4]} spacing={4}>
            {images.map((image, index) => (
              <Box key={index} position="relative" group>
                <Image
                  src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                  alt={`Hotel image ${index + 1}`}
                  borderRadius="lg"
                  objectFit="cover"
                  h="200px"
                  w="full"
                  cursor="pointer"
                  onClick={() => handleImageClick(image)}
                  _hover={{ opacity: 0.8 }}
                />
                <IconButton
                  icon={<FiX />}
                  size="sm"
                  colorScheme="red"
                  position="absolute"
                  top={2}
                  right={2}
                  onClick={() => handleRemoveImage(index)}
                  opacity={0}
                  _groupHover={{ opacity: 1 }}
                  transition="opacity 0.2s"
                />
                <IconButton
                  icon={<FiMaximize2 />}
                  size="sm"
                  colorScheme="blue"
                  position="absolute"
                  top={2}
                  left={2}
                  onClick={() => {
                    setSelectedImage(image);
                    onFullscreenOpen();
                  }}
                  opacity={0}
                  _groupHover={{ opacity: 1 }}
                  transition="opacity 0.2s"
                />
              </Box>
            ))}
          </SimpleGrid>
        )}
      </VStack>

      {/* Modal para vista previa */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent maxW="800px" my="auto">
          <ModalHeader>Vista Previa</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedImage && (
              <Image
                src={typeof selectedImage === 'string' ? selectedImage : URL.createObjectURL(selectedImage)}
                alt="Hotel preview"
                borderRadius="lg"
                w="full"
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modal para pantalla completa */}
      <Modal isOpen={isFullscreenOpen} onClose={onFullscreenClose} size="full">
        <ModalOverlay />
        <ModalContent bg="black" maxW="100vw" maxH="100vh" my="auto">
          <ModalCloseButton color="white" />
          <ModalBody p={0} display="flex" alignItems="center" justifyContent="center">
            {selectedImage && (
              <Image
                src={typeof selectedImage === 'string' ? selectedImage : URL.createObjectURL(selectedImage)}
                alt="Hotel fullscreen"
                maxW="100%"
                maxH="100vh"
                objectFit="contain"
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

HotelGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(File)
    ])
  ),
  onImagesChange: PropTypes.func
};

export default HotelGallery; 