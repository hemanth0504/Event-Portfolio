// src/components/RequireAdmin.jsx
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/useAuthContext.jsx";

export default function RequireAdmin({ children }) {
  const { user, loading } = useAuthContext();

  if (loading) return null; // or spinner
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Navigate to="/" />;

  return children;
}
