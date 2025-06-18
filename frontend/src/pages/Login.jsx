import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserStore } from "../stores/useUserStore.js"; 

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading } = useUserStore(); // ✅ Zustand methods

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted");
    await login(email, password); 


  const user = useUserStore.getState().user;
  console.log("Logged in user:", user); // ✅ Add this

  if (user) {
    navigate("/");
  }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFFAF8] px-4 py-12">
      <div className="flex shadow-md rounded-md overflow-hidden">
        {/* Left form */}
        <div className="w-96 bg-white p-8 flex flex-col justify-center">
          <h2 className="font-allura text-3xl text-[#D9A5B3] text-center mb-6 tracking-wider">
            Aadhya Signature Events
          </h2>

          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold text-[#2B2B2B]">Welcome back</h1>
            <p className="text-sm text-[#6B6B6B] mt-1">
              Please enter your details to sign in
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#2B2B2B] mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-[#2B2B2B] focus:outline-none focus:ring-1 focus:ring-[#D9A5B3]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#2B2B2B] mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-[#2B2B2B] focus:outline-none focus:ring-1 focus:ring-[#D9A5B3]"
                placeholder="••••••••"
              />
            </div>

            <div className="flex justify-between items-center text-sm text-[#6B6B6B]">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#D9A5B3]" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-[#D9A5B3] hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D9A5B3] text-white py-2 rounded-md text-sm hover:bg-[#c88a99] transition"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="text-center text-sm text-[#6B6B6B] mt-4">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-[#D9A5B3] font-medium hover:underline"
            >
              Sign up
            </button>
          </div>
        </div>

        {/* Right image */}
        <div className="w-96 hidden md:block">
          <img
            src="/Login.jpg"
            alt="Decor"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
