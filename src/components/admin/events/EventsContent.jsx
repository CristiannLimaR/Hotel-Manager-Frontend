import { useState, useEffect } from "react";
import {
  Box,
  Spinner,
  Flex,
  Divider,
  Text,
  useToast,
  SimpleGrid, 
} from "@chakra-ui/react";
import useHotelEvents from "../../../shared/hooks/useHotelEvents";

import EventsHeader from "./EventsHeader";
import EventCard from "./EventCard";
import EventFormModal from "./EventFormModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import EventDetailsModal from "./EventDetailsModal";

const recursosDisponibles = [
  "Sala Principal",
  "Proyector",
  "Equipo de Sonido",
  "Catering",
  "WiFi",
];

const EventsContent = () => {
  const {
    events,
    loading,
    hotelId,
    hotel,
    createEvent,
    updateEvent,
    deleteEvent,
    getEventDetails,
    eventDetails,
    fetchEvents,
  } = useHotelEvents();

  const toast = useToast();

  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos los Eventos");
  const [sortBy, setSortBy] = useState("date-asc");

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const [form, setForm] = useState({
    nombre_evento: "",
    descripcion: "",
    fecha: "",
    recursos_asignados: [],
    tipo_evento: "",
    estado: true,
  });
  const [editingEventId, setEditingEventId] = useState(null);
  const [deleteTargetEventId, setDeleteTargetEventId] = useState(null);
  const [selectedEventForDetails, setSelectedEventForDetails] = useState(null);

  useEffect(() => {
    const preparedEvents = events.map(event => ({
      ...event,
      status: event.estado ? "Activo" : "Inactivo",
      location: event.location || "Ubicación no especificada",
      capacity: event.capacity || "Capacidad no especificada",
      organizer: event.organizer || "Organizador no especificado"
    }));
    filterEvents(searchTerm, statusFilter, sortBy, preparedEvents);
  }, [events]);

  // Function to apply filters and sorting
  const filterEvents = (search, status, sort, currentEvents) => {
    let tempFiltered = [...currentEvents];

    if (search) {
      tempFiltered = tempFiltered.filter(
        (event) =>
          event.nombre_evento.toLowerCase().includes(search.toLowerCase()) ||
          (event.descripcion &&
            event.descripcion.toLowerCase().includes(search.toLowerCase())) ||
          (event.tipo_evento &&
            event.tipo_evento.toLowerCase().includes(search.toLowerCase()))
      );
    }

    if (status !== "Todos los Eventos") {
      tempFiltered = tempFiltered.filter((event) => event.status === status);
    }

    tempFiltered.sort((a, b) => {
      switch (sort) {
        case "date-asc":
          return new Date(a.fecha) - new Date(b.fecha);
        case "date-desc":
          return new Date(b.fecha) - new Date(a.fecha);
        case "name":
          return a.nombre_evento.localeCompare(b.nombre_evento);
        case "type":
          return (a.tipo_evento || "").localeCompare(b.tipo_evento || "");
        default:
          return 0;
      }
    });

    setFilteredEvents(tempFiltered);
  };

  // Handlers for search, filter, and sort in EventsHeader
  const handleSearch = (value) => {
    setSearchTerm(value);
    filterEvents(value, statusFilter, sortBy, events.map(e => ({ ...e, status: e.estado ? "Activo" : "Inactivo" })));
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    filterEvents(searchTerm, status, sortBy, events.map(e => ({ ...e, status: e.estado ? "Activo" : "Inactivo" })));
  };

  const handleSort = (value) => {
    setSortBy(value);
    filterEvents(searchTerm, statusFilter, value, events.map(e => ({ ...e, status: e.estado ? "Activo" : "Inactivo" })));
  };

  // Form handling
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRecursosChange = (selected) => {
    setForm((prev) => ({ ...prev, recursos_asignados: selected }));
  };

  const openAddEventModal = () => {
    resetForm();
    setIsFormModalOpen(true);
  };

  const openEditEventModal = (event) => {
    setEditingEventId(event._id);
    setForm({
      nombre_evento: event.nombre_evento || "",
      descripcion: event.descripcion || "",
      fecha: event.fecha ? new Date(event.fecha).toISOString().slice(0, 16) : "",
      recursos_asignados: event.recursos_asignados || [],
      servicios_adicionales: event.servicios_adicionales || [],
      tipo_evento: event.tipo_evento || "",
      estado: event.estado || false,
      hotel_id: event.hotel_id || ""
    });
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setForm({
      nombre_evento: "",
      descripcion: "",
      fecha: "",
      recursos_asignados: [],
      tipo_evento: "",
      estado: true,
    });
    setEditingEventId(null);
  };

  const handleSubmit = async (eventId, formattedData) => {
    if (!formattedData.nombre_evento || !formattedData.fecha) {
      toast({
        title: "Campos obligatorios",
        description: "Nombre del evento y fecha son obligatorios.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const success = await updateEvent(eventId, formattedData);

    if (success) {
      toast({
        title: "Evento actualizado",
        description: "El evento fue actualizado exitosamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchEvents(hotelId);
    }
  };

  // Delete handling
  const openDeleteConfirmation = (eventId) => {
    setDeleteTargetEventId(eventId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteTargetEventId(null);
  };

  const handleDelete = async () => {
    if (deleteTargetEventId) {
      const success = await deleteEvent(deleteTargetEventId);
      if (success) {
        toast({
          title: "Evento eliminado",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
        fetchEvents(hotelId); // Re-fetch events to update the list
      }
      closeDeleteModal();
    }
  };

  // Details handling
  const openDetailsModal = async (eventId) => {
    setSelectedEventForDetails(eventId);
    await getEventDetails(eventId); // Fetch details
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedEventForDetails(null);
  };

  return (
    <Box
      mt={6}
      p={6}
      bgGradient="linear(to-r, blue.50, white)"
      borderRadius="2xl"
      boxShadow="xl"
      maxW="container.lg"
      mx="auto"
    >
      <Flex justify="space-between" align="center" mb={6}>
        <Text
          fontSize="2xl"
          fontWeight="extrabold"
          bgGradient="linear(to-l, #4299E1, #2B6CB0)"
          bgClip="text"
          textTransform="uppercase"
          letterSpacing="wider"
        >
          Información del evento
        </Text>
      </Flex>

      <Box mb={4} px={4}>
        <Text fontSize="md" color="gray.600" mb={1}>
          <strong>Hotel ID:</strong> {hotelId || "No disponible"}
        </Text>
        {hotel?.nombre && (
          <Text fontSize="md" color="gray.600" mb={1}>
            <strong>Nombre del hotel:</strong> {hotel.nombre}
          </Text>
        )}
      </Box>

      <Divider borderColor="blue.200" mb={6} />

      <EventsHeader
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        statusFilter={statusFilter}
        handleStatusFilter={handleStatusFilter}
        sortBy={sortBy}
        handleSort={handleSort}
        onAddEvent={openAddEventModal}
      />

      {loading ? (
        <Flex justify="center" align="center" minH="250px">
          <Spinner size="xl" thickness="5px" speed="0.7s" color="blue.500" />
        </Flex>
      ) : filteredEvents.length === 0 ? (
        <Text
          mt={6}
          textAlign="center"
          color="gray.400"
          fontWeight="semibold"
          fontSize="lg"
          letterSpacing="wider"
        >
          No hay eventos disponibles para mostrar.
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredEvents.map((event) => (
            <EventCard
              key={event._id}
              event={{
                ...event,
                status: event.estado ? "Activo" : "Inactivo"
              }}
              onEdit={handleSubmit}
              onDelete={openDeleteConfirmation}
              onDetails={openDetailsModal}
            />
          ))}
        </SimpleGrid>
      )}

      <EventFormModal
        isOpen={isFormModalOpen}
        onClose={closeFormModal}
        form={form}
        editingEventId={editingEventId}
        onSuccess={handleSubmit}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
      />

      <EventDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        eventDetails={eventDetails ? {
          ...eventDetails,
          status: eventDetails.estado ? "Activo" : "Inactivo"
        } : null}
        loadingDetails={loading}
      />
    </Box>
  );
};

export default EventsContent;
