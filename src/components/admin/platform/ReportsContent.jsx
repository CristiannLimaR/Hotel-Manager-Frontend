import { useState } from "react";
import {
  Box,
  Heading,
  Grid,
  Select,
  Button,
  Flex,
  Text,
  Card,
  CardBody,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import useAuthStore from "./../../../shared/stores/authStore";
import useStats from "../../../shared/hooks/useStats.js";

import BusyHotels from "../reports/admin/BusyHotels.jsx";
import RoomsChart from "../reports/manager/RoomsChart.jsx";
import MonthlyReservations from "../reports/manager/MonthlyReservations.jsx";
import StatsCards from "../reports/StatsCards.jsx";

const ReportsContent = () => {
  const { user } = useAuthStore();
  const { stats, loading, refetch } = useStats();
  const [timeRange, setTimeRange] = useState("year");
  const [hotelFilter, setHotelFilter] = useState("all");

  const bg = useColorModeValue("gray.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const titleColor = useColorModeValue("teal.600", "teal.300");

  if (loading) {
    return (
      <Box minH="100vh" bg={bg}>
        <Box ml={{ base: 0, md: 60 }} p={8}>
          <Heading mb={6}>Cargando reportes...</Heading>
        </Box>
      </Box>
    );
  }

  return (
    <Box p={4} ml={{ base: 0, md: 60 }}>
      <Heading mb={6}>Reportes Avanzados</Heading>
      <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={4}>
        <Select value={timeRange} width="250px" maxW="200px" disabled={false}>
          <option value="year">Último año</option>
        </Select>
      </Flex>

      {user.role === "ADMIN_ROLE" && (
        <Box my={6}>
          <BusyHotels data={stats.hotelOccupancy} />
        </Box>
      )}

      {user.role === "MANAGER_ROLE" && stats?.hotelOccupancy && (
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
          <MonthlyReservations data={stats.monthlyStats} />
          <RoomsChart data={{
            busyRooms: stats.roomsOccupied,
            availableRooms: stats.roomsAvailable,
          }} />
        </Grid>
      )}

      <Divider my={8} borderColor="gray.300" />
      <StatsCards stats={stats} role={user.role} />
    </Box>
  );
};

export default ReportsContent;
