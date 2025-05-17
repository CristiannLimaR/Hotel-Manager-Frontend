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
  CardHeader,
} from "@chakra-ui/react";

const ReportsContent = () => {
  const [timeRange, setTimeRange] = useState("month");
  const [hotelFilter, setHotelFilter] = useState("all");

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading>Reportes Avanzados</Heading>
        <Flex gap={4}>
          <Select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            maxW="200px"
          >
            <option value="week">Última semana</option>
            <option value="month">Último mes</option>
            <option value="quarter">Último trimestre</option>
            <option value="year">Último año</option>
          </Select>
          <Select
            value={hotelFilter}
            onChange={(e) => setHotelFilter(e.target.value)}
            maxW="200px"
          >
            <option value="all">Todos los hoteles</option>
            <option value="1">Hotel Marina</option>
            <option value="2">Hotel Central</option>
          </Select>
          <Button colorScheme="blue">Exportar</Button>
        </Flex>
      </Flex>

      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {/* Demanda por Hotel */}
        <Card>
          <CardHeader>
            <Heading size="md">Demanda por Hotel</Heading>
          </CardHeader>
          <CardBody>
            <Text>Aquí irá el gráfico de demanda por hotel</Text>
          </CardBody>
        </Card>

        {/* Ocupación Global */}
        <Card>
          <CardHeader>
            <Heading size="md">Ocupación Global</Heading>
          </CardHeader>
          <CardBody>
            <Text>Aquí irá el gráfico de ocupación global</Text>
          </CardBody>
        </Card>

        {/* Ingresos por Período */}
        <Card>
          <CardHeader>
            <Heading size="md">Ingresos por Período</Heading>
          </CardHeader>
          <CardBody>
            <Text>Aquí irá el gráfico de ingresos</Text>
          </CardBody>
        </Card>

        {/* Tendencias de Reservas */}
        <Card>
          <CardHeader>
            <Heading size="md">Tendencias de Reservas</Heading>
          </CardHeader>
          <CardBody>
            <Text>Aquí irá el gráfico de tendencias</Text>
          </CardBody>
        </Card>
      </Grid>

      {/* Resumen de Métricas */}
      <Grid templateColumns="repeat(4, 1fr)" gap={6} mt={6}>
        <Card>
          <CardBody>
            <Text fontSize="sm" color="gray.500">Tasa de Ocupación Promedio</Text>
            <Text fontSize="2xl" fontWeight="bold">75%</Text>
            <Text fontSize="sm" color="green.500">↑ 5% vs período anterior</Text>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Text fontSize="sm" color="gray.500">Ingresos Totales</Text>
            <Text fontSize="2xl" fontWeight="bold">$125,000</Text>
            <Text fontSize="sm" color="green.500">↑ 12% vs período anterior</Text>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Text fontSize="sm" color="gray.500">Reservas Totales</Text>
            <Text fontSize="2xl" fontWeight="bold">1,234</Text>
            <Text fontSize="sm" color="green.500">↑ 8% vs período anterior</Text>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Text fontSize="sm" color="gray.500">Valor Promedio Reserva</Text>
            <Text fontSize="2xl" fontWeight="bold">$101.38</Text>
            <Text fontSize="sm" color="green.500">↑ 3% vs período anterior</Text>
          </CardBody>
        </Card>
      </Grid>
    </Box>
  );
};

export default ReportsContent; 