import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import HotelDetail from "./pages/HotelDetail";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Events from "./pages/Events";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import PlatformDashboard from "./pages/admin/PlatformDashboard";
import HotelDashboard from "./pages/admin/HotelDashboard";

export default function App() {
  useEffect(() => {
    document.title = "QuickStay - Hotel Booking";
  }, []);

  return (
    <Box minH="100vh">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="hotels" element={<Hotels />} />
          <Route path="hotels/:id" element={<HotelDetail />} />
          <Route path="booking/:hotelId" element={<Booking />} />
          <Route path="my-bookings" element={<MyBookings />} />
          <Route path="events" element={<Events />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/admin/platform" element={<PlatformDashboard />} />
        <Route path="/admin/hotel" element={<HotelDashboard />} />
      </Routes>
    </Box>
  );
}
