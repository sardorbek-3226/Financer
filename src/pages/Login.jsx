import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // LocalStorage dan foydalanuvchi ma'lumotini olish
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (currentUser) {
      // Login muvaffaqiyatli bo‘lsa, currentUser saqlash
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      navigate("/dashboard");
    } else {
      setError("Email yoki parol noto‘g‘ri!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-pink-200">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-96">
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          Login
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input input-bordered w-full px-4 py-2 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input input-bordered w-full px-4 py-2 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition mt-2"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
        <p className="mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
