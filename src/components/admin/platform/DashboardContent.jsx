import { Box, Grid, Heading, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, useColorModeValue } from "@chakra-ui/react";
import { Card } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import useStats from "../../../shared/hooks/useStats";
import useUsers from "../../../shared/hooks/useUsers";
import { useEffect, useState } from "react";

const DashboardContent = () => {
  const { stats, loading: statsLoading } = useStats();
  const { getUsers, isLoading: usersLoading } = useUsers();
  const cardBg = useColorModeValue('white', 'gray.700');
  const [chartData, setChartData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setTotalUsers(users?.length || 0);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (stats) {
      const occupancyData = stats.hotelOccupancy?.map(hotel => ({
        name: hotel.name,
        ocupacion: hotel.porcentOccupied
      })) || [];
      setChartData(occupancyData);
    }
  }, [stats]);

  if (statsLoading || usersLoading) {
    return <Box>Cargando estadísticas...</Box>;
  }

  return (
    <Box>
      <Heading mb={6}>Panel de Control de Plataforma</Heading>
      
      {/* KPIs Globales */}
      <Grid templateColumns="repeat(4, 1fr)" gap={6} mb={8}>
        <Card bg={cardBg} p={4}>
          <Stat>
            <StatLabel>Hoteles Activos</StatLabel>
            <StatNumber>{stats?.hotels?.length || 0}</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              {stats?.averageOccupancy || 0}% ocupación promedio
            </StatHelpText>
          </Stat>
        </Card>
        
        <Card bg={cardBg} p={4}>
          <Stat>
            <StatLabel>Reservas Totales</StatLabel>
            <StatNumber>{stats?.totalBookings || 0}</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              Reservas activas
            </StatHelpText>
          </Stat>
        </Card>
        
        <Card bg={cardBg} p={4}>
          <Stat>
            <StatLabel>Ocupación Promedio</StatLabel>
            <StatNumber>{stats?.averageOccupancy || 0}%</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              Tasa de ocupación
            </StatHelpText>
          </Stat>
        </Card>
        
        <Card bg={cardBg} p={4}>
          <Stat>
            <StatLabel>Usuarios Totales</StatLabel>
            <StatNumber>{totalUsers}</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              Registrados en el sistema
            </StatHelpText>
          </Stat>
        </Card>
      </Grid>

      {/* Estadísticas de Uso */}
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Card bg={cardBg} p={4}>
          <Heading size="md" mb={4}>Ocupación por Hotel</Heading>
          <Box height="300px">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ocupacion" name="Ocupación (%)" fill="#3182CE" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Card>
        
        <Card bg={cardBg} p={4}>
          <Heading size="md" mb={4}>Tendencia de Ocupación</Heading>
          <Box height="300px">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={stats?.monthlyStats || []}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="occupancyPercentage"
                  name="Ocupación Mensual (%)"
                  stroke="#38B2AC"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Card>
      </Grid>
    </Box>
  );
};

export default DashboardContent; 