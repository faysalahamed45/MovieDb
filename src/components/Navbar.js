import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-[#1a1a1a] text-black dark:text-white shadow-md px-4 py-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
      <Link to="/" className="text-xl font-bold text-blue-600 dark:text-white">
        🎬 MovieDB
      </Link>
      <div className="flex items-center gap-4 text-sm">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-gray-600 dark:text-white"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
        {token ? (
          <>
            <Link to="/add" className="text-blue-600 dark:text-netflix-red">Add Movie</Link>
            <button onClick={logout} className="text-red-500 dark:text-netflix-red">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-600 dark:text-netflix-red">Login</Link>
            <Link to="/register" className="text-blue-600 dark:text-netflix-red">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
