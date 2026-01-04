import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider.jsx";
import { Link, useLocation, useNavigate } from "react-router";
import { Moon, Sun, Menu, X } from "lucide-react";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [menuOpen, setMenuOpen] = useState(false);

  // Apply DaisyUI theme globally
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged Out Successfully");
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // NavLink component: text always white + 3D hover + active background
  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`
          relative px-3 py-2 font-medium transition-all transform rounded-lg
          text-white
          hover:scale-105 hover:shadow-lg hover:bg-green-500/20 dark:hover:bg-green-400/20
          ${isActive ? "bg-green-500/30 dark:bg-green-400/30" : ""}
        `}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-base-100/90 dark:bg-slate-900/90 border-b border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-green-600 dark:text-green-400 hover:scale-105 transition-transform"
        >
          KrishiLink
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-4">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/all-crops">All Crops</NavLink>
          {/* Only show dashboard link if user is logged in */}
          {user && <NavLink to="/dashboard">Dashboard</NavLink>}
          <NavLink to={'/about'}>About</NavLink>
          <NavLink to={'/privacy'}>Privacy & Policy</NavLink>
          {!user && <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>}

          {user && (
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-success ml-2 hover:scale-105 transform transition-shadow shadow-md hover:shadow-xl"
            >
              Logout
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-square btn-ghost ml-2 hover:scale-110 transition-transform"
          >
            {theme === "light" ? <Moon className="text-white hover:text-black" size={20} /> : <Sun size={20} />}
          </button>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="btn btn-square btn-ghost"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-base-100 dark:bg-slate-900 border-t border-gray-200 dark:border-gray-700 shadow-lg animate-slideDown">
          <ul className="flex flex-col gap-2 p-4">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/all-crops">All Crops</NavLink>
            {user && <NavLink to="/dashboard">Dashboard</NavLink>}
            {!user && <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>}
            {user && (
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-success mt-2 hover:scale-105 transform transition-shadow shadow-md hover:shadow-xl"
              >
                Logout
              </button>
            )}

            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-sm mt-2 flex items-center gap-2"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
