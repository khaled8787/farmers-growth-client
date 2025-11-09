import { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { Link, useLocation, useNavigate } from "react-router";


const Login = () => {
  const { signIn, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn(email, password)
      .then(() => navigate(from, { replace: true }))
      .catch(err => setError(err.message));
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin}>
        <input name="email" type="email" placeholder="Email" className="input input-bordered w-full mb-3" />
        <input name="password" type="password" placeholder="Password" className="input input-bordered w-full mb-3" />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="btn btn-success w-full">Login</button>
      </form>
      <button onClick={googleLogin} className="btn btn-outline w-full mt-3">
        Sign in with Google
      </button>
      <p className="text-sm mt-3 text-center">
        New here? <Link to="/register" className="text-green-700 font-semibold">Register</Link>
      </p>
    </div>
  );
};

export default Login;
