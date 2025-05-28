import { useState } from "react";
import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  IconButton,
} from "@chakra-ui/react";
import {
  FiSearch,
  FiFilter,
  FiPlus,
  FiEye,
  FiDownload,
  FiPrinter,
} from "react-icons/fi";

const InvoicesContent = () => {
  const [invoices, setInvoices] = useState([
    {
      id: "INV-10583",
      guest: "John Smith",
      room: "301 - King Suite",
      amount: 680.00,
      date: "2025-05-15T00:00:00.000Z",
      status: "Paid"
    },
    {
      id: "INV-10582",
      guest: "Maria Garcia",
      room: "212 - Double Room",
      amount: 450.00,
      date: "2025-05-15T00:00:00.000Z",
      status: "Partial"
    },
    {
      id: "INV-10581",
      guest: "Carlos Vega",
      room: "220 - Double Room",
      amount: 520.00,
      date: "2025-05-14T00:00:00.000Z",
      status: "Unpaid"
    }
  ]);
  const [filteredInvoices, setFilteredInvoices] = useState(invoices);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Invoices");
  const [dateRange, setDateRange] = useState("today");

  const handleSearch = (value) => {
    setSearchTerm(value);
    filterInvoices(value, statusFilter, dateRange);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    filterInvoices(searchTerm, status, dateRange);
  };

  const handleDateRange = (range) => {
    setDateRange(range);
    filterInvoices(searchTerm, statusFilter, range);
  };

  const filterInvoices = (search, status, range) => {
    let filtered = invoices;

    if (search) {
      filtered = filtered.filter(invoice => 
        invoice.guest.toLowerCase().includes(search.toLowerCase()) ||
        invoice.id.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== "All Invoices") {
      filtered = filtered.filter(invoice => invoice.status === status);
    }

    const today = new Date();
    const startDate = new Date();
    switch (range) {
      case "today":
        startDate.setHours(0, 0, 0, 0);
        break;
      case "week":
        startDate.setDate(today.getDate() - 7);
        break;
      case "month":
        startDate.setMonth(today.getMonth() - 1);
        break;
      case "quarter":
        startDate.setMonth(today.getMonth() - 3);
        break;
      default:
        break;
    }

    if (range !== "custom") {
      filtered = filtered.filter(invoice => {
        const invoiceDate = new Date(invoice.date);
        return invoiceDate >= startDate && invoiceDate <= today;
      });
    }

    setFilteredInvoices(filtered);
  };

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <HStack>
          <InputGroup w="300px">
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="gray.400" />
            </InputLeftElement>
            <Input 
              placeholder="Buscar facturas..." 
              borderRadius="md"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </InputGroup>
          <Menu>
            <MenuButton as={Button} rightIcon={<FiFilter />} variant="outline">
              Estado: {statusFilter}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleStatusFilter("All Invoices")}>All Invoices</MenuItem>
              <MenuItem onClick={() => handleStatusFilter("Paid")}>Paid</MenuItem>
              <MenuItem onClick={() => handleStatusFilter("Unpaid")}>Unpaid</MenuItem>
              <MenuItem onClick={() => handleStatusFilter("Partial")}>Partially Paid</MenuItem>
              <MenuItem onClick={() => handleStatusFilter("Cancelled")}>Cancelled</MenuItem>
            </MenuList>
          </Menu>
          <Select 
            placeholder="Rango de Fecha" 
            w="180px"
            value={dateRange}
            onChange={(e) => handleDateRange(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="custom">Custom Range</option>
          </Select>
        </HStack>
        <HStack>
          <Button leftIcon={<FiPrinter />} variant="outline">
            Print
          </Button>
          <Button leftIcon={<FiDownload />} variant="outline">
            Export
          </Button>
          <Button colorScheme="blue" leftIcon={<FiPlus />}>
            New Invoice
          </Button>
        </HStack>
      </HStack>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Invoice #</Th>
            <Th>Guest</Th>
            <Th>Room</Th>
            <Th>Amount</Th>
            <Th>Date</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredInvoices.map((invoice) => (
            <Tr key={invoice.id}>
              <Td>{invoice.id}</Td>
              <Td>{invoice.guest}</Td>
              <Td>{invoice.room}</Td>
              <Td>${invoice.amount.toFixed(2)}</Td>
              <Td>{new Date(invoice.date).toLocaleDateString()}</Td>
              <Td>
                <Badge colorScheme={
                  invoice.status === "Paid" ? "green" :
                  invoice.status === "Partial" ? "yellow" :
                  invoice.status === "Cancelled" ? "red" : "gray"
                }>
                  {invoice.status}
                </Badge>
              </Td>
              <Td>
                <HStack spacing={2}>
                  <IconButton aria-label="View invoice" icon={<FiEye />} size="sm" />
                  <IconButton aria-label="Download invoice" icon={<FiDownload />} size="sm" />
                  <IconButton aria-label="Print invoice" icon={<FiPrinter />} size="sm" />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default InvoicesContent; 