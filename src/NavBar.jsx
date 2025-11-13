import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider.jsx";
import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          KrishiLink
        </Link>

        <ul className="flex items-center space-x-6">
          <li>
            <Link to="/" className="hover:text-green-200">
              Home
            </Link>
          </li>

          <li>
            <Link to="/all-crops" className="hover:text-green-200">
              All Crops
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <Link to="/add-crop" className="hover:text-green-200">
                  Add Crop
                </Link>
              </li>
              <li>
                <Link to="/my-posts" className="hover:text-green-200">
                  My Posts
                </Link>
              </li>
              <li>
                <Link to="/my-interests" className="hover:text-green-200">
                  My Interests
                </Link>
              </li>
              <li>
                <Link className="hover:text-green-200" to="/my-crops">My Crops</Link>
              </li>
              <li>
                <Link className="hover:text-green-200" to="/my-profile">My Profile</Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-white text-green-600 px-4 py-1 rounded hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-green-200">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-green-200">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
