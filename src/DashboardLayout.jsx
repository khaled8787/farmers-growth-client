// DashboardLayout.jsx
import React, { useContext, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { AuthContext } from "./AuthProvider.jsx";
import { Menu, X, Moon, Sun } from "lucide-react";

const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const location = useLocation();

  // Theme toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="pt-10 flex min-h-screen bg-green-50 dark:bg-slate-900">
      
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-900 shadow-xl">
        <div className="flex items-center justify-center h-20 font-bold text-2xl text-green-600 dark:text-green-400">
          Dashboard
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link
            to="my-profile"
            className={`block px-4 text-white py-2 rounded-lg font-medium ${
              isActive("/my-profile") ? "bg-green-500/30 dark:bg-green-400/30" : "hover:bg-green-100 dark:hover:bg-green-800"
            }`}
          >
            My Profile
          </Link>
          <Link
            to="my-posts"
            className={`block text-white px-4 py-2 rounded-lg font-medium ${
              isActive("/my-posts") ? "bg-green-500/30 dark:bg-green-400/30" : "hover:bg-green-100 dark:hover:bg-green-800"
            }`}
          >
            My Posts
          </Link>
          <Link
            to="my-interests"
            className={`block text-white px-4 py-2 rounded-lg font-medium ${
              isActive("/my-interests") ? "bg-green-500/30 dark:bg-green-400/30" : "hover:bg-green-100 dark:hover:bg-green-800"
            }`}
          >
            My Interests
          </Link>
          <Link
            to="my-crops"
            className={`block text-white px-4 py-2 rounded-lg font-medium ${
              isActive("/my-crops") ? "bg-green-500/30 dark:bg-green-400/30" : "hover:bg-green-100 dark:hover:bg-green-800"
            }`}
          >
            My Crops
          </Link>
          <Link
            to="add-crop"
            className={`block text-white px-4 py-2 rounded-lg font-medium ${
              isActive("/add-crop") ? "bg-green-500/30 dark:bg-green-400/30" : "hover:bg-green-100 dark:hover:bg-green-800"
            }`}
          >
            Add Crop
          </Link>
          <button
            onClick={handleLogout}
            className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg shadow-lg transition-transform hover:scale-105"
          >
            Logout
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="mt-6 flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-slate-700 rounded-lg w-full hover:scale-105 transition-transform"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </nav>
      </aside>

      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden flex flex-col w-full">
        <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 shadow-lg">
          <div className="font-bold text-xl text-green-600 dark:text-green-400">Dashboard</div>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="text-white" size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <div className="flex flex-col bg-white dark:bg-slate-900 p-4 space-y-2 shadow-lg">
            <Link className="text-white" to="my-profile">My Profile</Link>
            <Link className="text-white" to="my-posts">My Posts</Link>
            <Link className="text-white" to="my-interests">My Interests</Link>
            <Link className="text-white" to="my-crops">My Crops</Link>
            <Link className="text-white" to="add-crop">Add Crop</Link>
            <button onClick={handleLogout} className="bg-red-500 text-white py-2 rounded-lg mt-2">Logout</button>
            <button onClick={toggleTheme} className="bg-gray-200 dark:bg-slate-700 py-2 rounded-lg mt-2">{theme === "light" ? "Dark Mode" : "Light Mode"}</button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
