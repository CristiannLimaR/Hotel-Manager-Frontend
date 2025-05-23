import { useState, useEffect } from "react";

import {
  getOccupancyStats,
  getMonthStats,
  getBusyAvailableRooms,
  getTotalReservations,
} from "../../services/api.js";
import useAuthStore from "./../stores/authStore";
import { useToast } from "@chakra-ui/react";

const useStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();
  const { user } = useAuthStore();

  const fetchStats = async () => {
    setIsLoading(true);
    setError(null);

    try {
      let response;
      const totalReservationsData = await getTotalReservations();
      const totalBookings = totalReservationsData?.totalReservations ?? 0;

      if (user.role === "ADMIN_ROLE") {
        const occupancyData = await getOccupancyStats();
        response = transformAdminData(occupancyData);
      } else if (user.role === "MANAGER_ROLE") {
        const [monthStats, roomsStats] = await Promise.all([
          getMonthStats(user.hotelId),
          getBusyAvailableRooms(user.hotelId),
        ]);
        response = transformManagerData(monthStats, roomsStats);
      }

      if (!response) throw Error("No se recibieron datos del server.");

      response.totalBookings = totalBookings;

      setStats(response);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al cargar estadísticas",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const transformAdminData = (data) => {
    if (!data?.stats) {
      return null;
    }

    // Calcular datos
    const totalReservations = data.stats.reduce(
      (sum, hotel) => sum + (hotel.reservations || 0),
      0
    );

    const averageOccupancy =
      data.stats.reduce((sum, hotel) => {
        const occupancy = parseFloat(hotel.porcentOccupied) || 0;
        return sum + occupancy;
      }, 0) / (data.stats.length || 1);

    return {
      hotelOccupancy: data.stats.map((hotel) => ({
        name: hotel.name,
        porcentOccupied: parseFloat(hotel.porcentOccupied) || 0,
      })),
      averageOccupancy: averageOccupancy.toFixed(2),
      totalBookings: totalReservations.toString(),
      hotels: data.stats.map((hotel) => ({
        _id: hotel._id,
        name: hotel.name,
      })),
    };
  };

  const transformManagerData = (monthStats, roomsStats) => {
    if (!monthStats?.stats || !roomsStats) return null;

    // Calcular datos
    const totalReservations = monthStats.stats.reduce(
      (sum, month) => sum + month.reservations,
      0
    );
    const monthlyOccupancy = monthStats.stats.map((month) => ({
      month: month.month,
      reservations: month.reservations,
      occupancyPercentage: (month.reservations / 30) * 100, // Aproximación
    }));

    return {
      monthlyStats: monthlyOccupancy,
      roomsAvailable: roomsStats.availableRooms || 0,
      roomsOccupied: roomsStats.busyRooms || 0,
      totalBookings: totalReservations,
      averageOccupancy: roomsStats.porcentBusy || 0,
    };
  };

  useEffect(() => {
    fetchStats();
  }, [user]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
};

export default useStats;
