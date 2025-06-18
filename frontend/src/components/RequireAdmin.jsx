
import { Navigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

export default function RequireAdmin({ children }) {
  const { user, checkingAuth } = useUserStore();

  if (checkingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Checking admin access...</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Navigate to="/" />;

  return children;
}
