// src/components/admin/AdminSidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-64 h-screen bg-[#f8f8f8] border-r p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-4 text-sm">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive ? "text-[#D38DA8] font-medium" : "text-gray-700"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              isActive ? "text-[#D38DA8] font-medium" : "text-gray-700"
            }
          >
            All Products
          </NavLink>
          <NavLink
            to="/admin/add-product"
            className={({ isActive }) =>
              isActive ? "text-[#D38DA8] font-medium" : "text-gray-700"
            }
          >
            Add Product
          </NavLink>
        </nav>
      </div>

      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 w-full text-left text-sm text-[#D38DA8] hover:underline"
      >
        ← Back to Home
      </button>
    </aside>
  );
}
