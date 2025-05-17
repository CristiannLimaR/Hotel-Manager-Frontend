import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../../shared/stores/authStore';

const ManagerRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== 'MANAGER_ROLE') return <Navigate to="/" replace />;
  
  return children;
};

ManagerRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default ManagerRoute; 