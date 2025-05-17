import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../../shared/stores/authStore';

const AdminRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== 'ADMIN_ROLE') return <Navigate to="/" replace />;
  
  return children;
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default AdminRoute; 