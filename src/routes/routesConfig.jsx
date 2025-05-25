import Home from "../pages/Home";
import Hotels from "../pages/Hotels";
import HotelDetail from "../pages/HotelDetail";
import Booking from "../pages/Booking";
import MyBookings from "../pages/MyBookings";
import Events from "../pages/Events";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import PlatformDashboard from "../pages/admin/PlatformDashboard";
import HotelDashboard from "../pages/admin/HotelDashboard";

export const publicRoutes = [
  { path: '/', element: <Home /> },
  { path: 'hotels', element: <Hotels /> },
  { path: 'hotels/:id', element: <HotelDetail /> },
  { path: 'login', element: <Login /> },
  { path: 'register', element: <Register /> },
];

export const protectedRoutes = [
  { path: 'events', element: <Events /> },
  { path: 'booking/:hotelId/:roomId', element: <Booking /> },
  { path: 'my-bookings', element: <MyBookings /> },
  { path: 'profile', element: <Profile /> },
];

export const adminRoutes = [
  { path: '/admin/platform', element: <PlatformDashboard /> },
];

export const managerRoutes = [
  { path: '/admin/hotel', element: <HotelDashboard /> },
]; 