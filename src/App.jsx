import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import Profile from "./pages/Profile";
import useAuthStore from "./shared/stores/authStore";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

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
          <Route path="booking/:hotelId" element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          } />
          <Route path="my-bookings" element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          } />
          <Route path="events" element={<Events />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/admin/platform" element={
          <ProtectedRoute>
            <PlatformDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/hotel" element={
          <ProtectedRoute>
            <HotelDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </Box>
  );
}
