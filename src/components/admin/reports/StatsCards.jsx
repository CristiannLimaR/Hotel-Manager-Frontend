import {
  Grid,
  Card,
  CardBody,
  Text,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";

const StatsCards = ({ stats, role }) => {
  const bg = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const valueColor = useColorModeValue("teal.600", "teal.300");

  if (!stats) {
    return (
      <Box minH="100vh" bg={bg}>
        <Box ml={{ base: 0, md: 60 }} p={8}>
          <Heading mb={6}>Cargando reportes...</Heading>
        </Box>
      </Box>
    );
  }

  return (
    <Grid templateColumns="repeat(auto-fit, minmax(220px, 1fr))" gap={6} mt={6}>
      <Card>
        <CardBody>
          <Text fontSize="sm" color={textColor}>
            {role === "ADMIN_ROLE" ? "Ocupación Promedio" : "Tasa de Ocupación"}
          </Text>
          <Text fontSize="2x1" fontWeight="bold" color={valueColor}>
            {stats.averageOccupancy ?? "0"}%
          </Text>
          <Text fontSize="xs" color={textColor}>
            Ocupación Anual
          </Text>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Text fontSize="sm" color={textColor}>
            Reservas Totales
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color={valueColor}>
            {stats.totalBookings ?? "0"}
          </Text>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Text>{role === "ADMIN_ROLE" ? "Hoteles" : "Tu Hotel"}</Text>
          <Text fontSize="2xl" fontWeight="bold" color={valueColor}>
            {role === "ADMIN_ROLE" ? stats.hotels?.length ?? "0" : "1"}
          </Text>
          <Text fontSize="xs" color={textColor}>
            {role === "ADMIN_ROLE" ? "Gestionados" : "A tu cargo"}
          </Text>
        </CardBody>
      </Card>
    </Grid>
  );
};

export default StatsCards;
