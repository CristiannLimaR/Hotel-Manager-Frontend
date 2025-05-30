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
  console.log("Datos recibidos en MonthlyReservations:", data);
  const textColor = useColorModeValue("gray.800", "white");

  if (!data || data.length === 0) {
    console.log("No hay datos para mostrar");
    return <Text>No hay datos de reservaciones disponibles</Text>;
  }

  const chartData = data.map((month) => ({
    name: month.month.substring(0, 3),
    reservations: month.reservations,
  }));
  console.log(" Datos procesados para BarChart:", chartData);

  return (
    <Box>
      <ResponsiveContainer height={300} width="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" interval={0} angle={-35} textAnchor="end" tickMargin={5}/>
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
