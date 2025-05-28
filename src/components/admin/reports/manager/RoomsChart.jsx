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

const COLORS = ["#FF8042", "#00C49F"];

const RoomsChart = ({ occupied, available }) => {
  const textColor = useColorModeValue("gray.800", "white");

  const chartData = [
    { name: "Ocupadas", value: occupied || 0 },
    { name: "Disponibles", value: available || 0 },
  ];

  if (!occupied && !available) {
    return <Text>No hay datos disponibles</Text>;
  }

  return (
    <Box>
      <ResponsiveContainer height={300} width="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}`}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default RoomsChart;
