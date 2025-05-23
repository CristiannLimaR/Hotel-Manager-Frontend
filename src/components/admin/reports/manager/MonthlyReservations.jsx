import { Box, Text } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useColorModeValue } from "@chakra-ui/react";

const MonthlyReservations = ({ data }) => {
  const textColor = useColorModeValue("gray.800", "white");

  if (!data?.stats || data.stats.length === 0 ) {
    return <Text>No hay datos de reservaciones disponibles</Text>;
  }

  const chartData = data.stats.map((month) => ({
    name: month.month.substring(0, 3),
    reservations: month.reservations,
  }));

  return (
    <Box>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="reservations"
            fill="#8884d8"
            name="Reservas"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MonthlyReservations;
