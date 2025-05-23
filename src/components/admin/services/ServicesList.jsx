import { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { deleteService } from '../../../services/api';
import ServiceForm from './ServiceForm';

const ServicesList = ({ services, refreshServices }) => {
  const toast = useToast();
  const [deletingId, setDeletingId] = useState(null);
  const [editingService, setEditingService] = useState(null);

  const handleDelete = async (serviceId) => {
    setDeletingId(serviceId);
    try {
      const response = await deleteService(serviceId);
      
      if (response?.error) {
        throw new Error(response.message || 'Error al eliminar el servicio');
      }

      toast({
        title: 'Servicio eliminado',
        status: 'success',
        duration: 2000,
      });
      refreshServices();
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: 'Error al eliminar',
        description: error.message || 'El servicio no existe o ya fue eliminado',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
  };

  const handleEditComplete = () => {
    setEditingService(null);
    refreshServices();
  };

  return (
    <>
      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Descripción</Th>
              <Th isNumeric>Precio</Th>
              <Th>Categoría</Th>
              <Th>Estado</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.isArray(services) && services.map((service) => (
              <Tr key={service._id}>
                <Td>{service.name}</Td>
                <Td>{service.description}</Td>
                <Td isNumeric>${service.price.toFixed(2)}</Td>
                <Td>
                  <Badge colorScheme="purple">{service.category}</Badge>
                </Td>
                <Td>
                  <Badge colorScheme={service.available ? 'green' : 'red'}>
                    {service.available ? 'DISPONIBLE' : 'NO DISPONIBLE'}
                  </Badge>
                </Td>
                <Td>
                  <IconButton
                    aria-label="Editar servicio"
                    icon={<EditIcon />}
                    mr={2}
                    colorScheme="blue"
                    onClick={() => handleEdit(service)}
                  />
                  <IconButton
                    aria-label="Eliminar servicio"
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    isLoading={deletingId === service._id}
                    onClick={() => handleDelete(service._id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {editingService && (
        <ServiceForm
          editingService={editingService}
          refreshServices={refreshServices}
          onEditComplete={handleEditComplete}
        />
      )}
    </>
  );
};

export default ServicesList;