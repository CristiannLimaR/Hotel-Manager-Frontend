import { Box, Text } from "@chakra-ui/react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useColorModeValue } from "@chakra-ui/react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

function BusyHotels({ data }) {
  const textColor = useColorModeValue("gray.800", "white");

  if (!data) {
    return <Text>No hay datos disponibles</Text>;
  }

  // Filtrar los hoteles por ocupación
  const chartData = data
    .filter((hotel) => parseFloat(hotel.porcentOccupied) > 0)
    .sort(
      (a, b) => parseFloat(b.porcentOccupied) - parseFloat(a.porcentOccupied)
    )
    .map((hotel, index) => ({
      name: hotel.name,
      value: parseFloat(hotel.porcentOccupied),
      id: index,
    }));

  return (
    <Box height="400px">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            fill="#8004d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(1)}%`
            }
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value}%`, "Ocupación"]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default BusyHotels;
