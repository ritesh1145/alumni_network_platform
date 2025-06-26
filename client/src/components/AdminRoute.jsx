//Admin
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
  const { token, user } = useAuth();
  return token && user?.role === 'admin' ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;