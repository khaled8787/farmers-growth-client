import React from "react";
import { Link } from "react-router";


const Navbar = ({ user, handleLogout }) => {
  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between items-center">
      <div className="logo font-bold text-xl">KrishiLink</div>
      <div className="links flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/all-crops">All Crops</Link>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/add-crop">Add Crops</Link>
            <Link to="/my-posts">My Posts</Link>
            <Link to="/my-interests">My Interests</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
