import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserStore } from "../stores/useUserStore.js"; // ✅ import your Zustand store

export default function Register() {
  const navigate = useNavigate();
  const { signup, loading } = useUserStore(); // ✅ destructure from store

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    await signup({
      name: form.name,
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
    });

    // ✅ navigate if successful (optional - Zustand doesn't return status directly)
    if (useUserStore.getState().user) {
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFFAF8] px-4 py-12">
      <div className="flex shadow-md rounded-md overflow-hidden">
        <div className="w-96 bg-white p-8 flex flex-col justify-center">
          <h2 className="font-allura text-3xl text-[#D9A5B3] text-center mb-6 tracking-wider">
            Aadhya Signature Events
          </h2>

          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold text-[#2B2B2B]">Create an account</h1>
            <p className="text-sm text-[#6B6B6B] mt-1">
              Start your decor journey with us today
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#2B2B2B] mb-1">Name</label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-[#D9A5B3]"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#2B2B2B] mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-[#D9A5B3]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#2B2B2B] mb-1">Password</label>
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-[#D9A5B3]"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#2B2B2B] mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-[#D9A5B3]"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D9A5B3] text-white py-2 rounded-md text-sm hover:bg-[#c88a99] transition"
            >
              {loading ? "Creating..." : "Register"}
            </button>
          </form>

          <div className="text-center text-sm text-[#6B6B6B] mt-4">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-[#D9A5B3] font-medium hover:underline"
            >
              Log in
            </button>
          </div>
        </div>

        <div className="w-96 hidden md:block">
          <img src="/Register.jpg" alt="Decor" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
