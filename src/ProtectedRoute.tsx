import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const isAdminAuthenticated = Boolean(localStorage.getItem("roleId") === "1"); // Check if the user is admin
  const isTraineeAuthenticated = Boolean(localStorage.getItem("traineeId")); // Check if logged in as trainee

  // If either admin or trainee is authenticated, grant access
  return isAdminAuthenticated || isTraineeAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
