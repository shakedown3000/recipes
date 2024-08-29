import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../Context/UserContext";

const PrivateRoute = () => {
  const userContext = useUserContext();
  const user = userContext?.user;
  const loading = userContext?.loading;
  // Gibts einen User/Bin ich angemeldet, dann alle Routen normal anzeigen
  // Gibt es keinen User, dann direkt immer zur Loginpage navigieren

  if (loading) {
    return <p>Loading...</p>;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
