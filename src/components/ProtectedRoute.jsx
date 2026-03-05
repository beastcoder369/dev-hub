import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userData = useSelector((store) => store.user);

  // userData is null  → not logged in → redirect
  // userData is object → logged in    → show page
  // NOTE: we no longer redirect during loading because Body.jsx
  // handles the loading state and only renders children after
  // the auth check is complete. By the time ProtectedRoute runs,
  // userData is either set (logged in) or still null (not logged in).
  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
