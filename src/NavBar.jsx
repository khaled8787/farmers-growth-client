import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Link } from "react-router";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-green-600 text-white px-4 py-3 flex justify-between items-center">
      <div className="text-xl font-bold">KrishiLink</div>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/all-crops">All Crops</Link>

        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/add-crop">Add Crop</Link>
            <Link to="/my-posts">My Posts</Link>
            <Link to="/my-interests">My Interests</Link>
            <button className="btn btn-primary" onClick={logout}>Logout</button>
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
