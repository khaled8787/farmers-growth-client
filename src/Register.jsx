import { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { Link, useNavigate } from "react-router";


const Register = () => {
  const { createUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    createUser(email, password)
      .then(() => navigate("/"))
      .catch(err => setError(err.message));
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleRegister}>
        <input name="email" type="email" placeholder="Email" className="input input-bordered w-full mb-3" />
        <input name="password" type="password" placeholder="Password" className="input input-bordered w-full mb-3" />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="btn btn-success w-full">Register</button>
      </form>
      <p className="text-sm mt-3 text-center">
        Already have an account? <Link to="/login" className="text-green-700 font-semibold">Login</Link>
      </p>
    </div>
  );
};

export default Register;
