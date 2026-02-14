import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation(); // hozirgi pathni olish

  const menuItems = [
    { path: "/app", label: "Dashboard" },
    { path: "/transactions", label: "Kirim/Chiqim" },
    { path: "/analytics", label: "Analitika" },
    { path: "/reports", label: "Hisobotlar" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login"; // loginga qaytaradi
  };

  return (
    <nav className="flex justify-between items-center bg-white/80 backdrop-blur-md shadow p-4">
      <ul className="flex gap-6">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`font-semibold hover:text-purple-700 transition ${
                location.pathname === item.path ? "text-purple-700 underline" : "text-gray-700"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </nav>
  );
}
