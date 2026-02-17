import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: "/app", label: "Dashboard" },
    { path: "/transactions", label: "Kirim/Chiqim" },
    { path: "/analytics", label: "Analitika" },
    { path: "/reports", label: "Hisobotlar" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/register";
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow p-4">
      <div className="flex justify-between items-center">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <img
            src="/financer.png"
            alt="Logo"
            className="w-8 h-8"
          />
          <span className="font-bold text-lg text-purple-700">
            Finance Tracker
          </span>
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden min-[568px]:flex gap-6 items-center">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`font-semibold hover:text-purple-700 transition ${
                  location.pathname === item.path
                    ? "text-purple-700 underline"
                    : "text-gray-700"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </ul>

        {/* MOBILE HAMBURGER */}
        <button
          className="min-[568px]:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="mt-4 flex flex-col gap-4 min-[568px]:hidden">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`font-semibold ${
                location.pathname === item.path
                  ? "text-purple-700 underline"
                  : "text-gray-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
