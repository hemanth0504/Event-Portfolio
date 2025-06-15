import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3000/api/auth/signup",
        { name, email, password },
        { withCredentials: true }
      );
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error.response?.data?.message || error.message);
      alert("Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFFAF8] px-4 py-12">
      <div className="flex shadow-md rounded-md overflow-hidden">
        {/* Left form */}
        <div className="w-96 bg-white p-8 flex flex-col justify-center">
          {/* Brand Heading */}
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
              <label className="block text-xs font-medium text-[#2B2B2B] mb-1">
                Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-[#2B2B2B] focus:outline-none focus:ring-1 focus:ring-[#D9A5B3]"
                placeholder="Your full name"
              />
            </div>

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

            <button
              type="submit"
              className="w-full bg-[#D9A5B3] text-white py-2 rounded-md text-sm hover:bg-[#c88a99] transition"
            >
              Register
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

        {/* Right image */}
        <div className="w-96 hidden md:block">
          <img
            src="/Register.jpg"
            alt="Decor"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
