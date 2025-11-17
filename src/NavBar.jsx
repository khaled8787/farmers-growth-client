import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider.jsx";
import { Link, useNavigate } from "react-router";
import { Moon, Sun, Menu, X } from "lucide-react";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Log Out Successfully');
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navLinks = (
    <>
      <li>
        <Link to="/" className="hover:text-green-400 transition">Home</Link>
      </li>
      <li>
        <Link to="/all-crops" className="hover:text-green-400 transition">All Crops</Link>
      </li>
      {user ? (
        <>
          <li><Link to="/add-crop" className="hover:text-green-400 transition">Add Crop</Link></li>
          <li><Link to="/my-posts" className="hover:text-green-400 transition">My Posts</Link></li>
          <li><Link to="/my-interests" className="hover:text-green-400 transition">My Interests</Link></li>
          <li><Link to="/my-crops" className="hover:text-green-400 transition">My Crops</Link></li>
          <li><Link to="/my-profile" className="hover:text-green-400 transition">My Profile</Link></li>
          <li>
            <button
              onClick={handleLogout}
              className="bg-white text-green-600 px-4 py-1 rounded-md hover:bg-gray-100 transition font-semibold"
            >
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li><Link to="/login" className="hover:text-green-400 transition">Login</Link></li>
          <li><Link to="/register" className="hover:text-green-400 transition">Register</Link></li>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-gradient-to-r from-green-600 to-green-700 dark:from-gray-900 dark:to-gray-800 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide hover:scale-105 transition-transform">
           KrishiLink
        </Link>

        <ul className="hidden md:flex items-center space-x-6 text-[17px] font-medium">
          {navLinks}
          <li>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </li>
        </ul>

        <button
          className="md:hidden p-2 bg-white/10 rounded hover:bg-white/20 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-green-700 dark:bg-gray-900 px-6 pb-4">
          <ul className="flex flex-col space-y-3 text-lg font-medium">
            {navLinks}
            <li>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 mt-2 p-2 bg-white/10 rounded hover:bg-white/20 transition w-fit"
              >
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
