import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import AdminRoute from "./components/routes/AdminRoute";
import ManagerRoute from "./components/routes/ManagerRoute";

import { publicRoutes, protectedRoutes, adminRoutes, managerRoutes } from "./routes/routesConfig.jsx";

export default function App() {
  useEffect(() => {
    document.title = "QuickStay - Reserva de Hoteles";
  }, []);

  return (
    <Box minH="100vh">
      <Routes>
        <Route path="/" element={<Layout />}>
          {publicRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}

          {protectedRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={<ProtectedRoute>{element}</ProtectedRoute>}
            />
          ))}

          <Route path="*" element={<NotFound />} />
        </Route>

        {adminRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<AdminRoute>{element}</AdminRoute>}
          />
        ))}

        {managerRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<ManagerRoute>{element}</ManagerRoute>}
          />
        ))}
      </Routes>
    </Box>
  );
}
