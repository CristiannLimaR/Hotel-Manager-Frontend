import { Box, Grid, Heading, Stat, StatLabel, StatNumber, StatHelpText, StatArrow } from "@chakra-ui/react";
import { Card } from "@chakra-ui/react";

const DashboardContent = () => {
  return (
    <Box>
      <Heading mb={6}>Panel de Control de Plataforma</Heading>
      
      {/* KPIs Globales */}
      <Grid templateColumns="repeat(4, 1fr)" gap={6} mb={8}>
        <Card>
          <Stat>
            <StatLabel>Hoteles Activos</StatLabel>
            <StatNumber>45</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>
        </Card>
        
        <Card>
          <Stat>
            <StatLabel>Usuarios Totales</StatLabel>
            <StatNumber>1,234</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              12.5%
            </StatHelpText>
          </Stat>
        </Card>
        
        <Card>
          <Stat>
            <StatLabel>Reservas del Mes</StatLabel>
            <StatNumber>892</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              8.2%
            </StatHelpText>
          </Stat>
        </Card>
        
        <Card>
          <Stat>
            <StatLabel>Ingresos Totales</StatLabel>
            <StatNumber>$45,678</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              15.3%
            </StatHelpText>
          </Stat>
        </Card>
      </Grid>

      {/* Estadísticas de Uso */}
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Card>
          <Heading size="md" mb={4}>Ocupación Global</Heading>
          {/* Aquí irá el gráfico de ocupación */}
        </Card>
        
        <Card>
          <Heading size="md" mb={4}>Demanda por Hotel</Heading>
          {/* Aquí irá el gráfico de demanda */}
        </Card>
      </Grid>
    </Box>
  );
};

export default DashboardContent; 