import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getUser } from "../../utils/auth";

export function PrivateRoute({ children, roles }) {
  const { isAuthenticated, isLoading } = useAuth();
  const user = getUser();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user || !roles.includes(user.role)) {
    return <Navigate to="/register" replace />;
  }

  return children;
}
