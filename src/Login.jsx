import { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { Link, useLocation, useNavigate } from "react-router";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError(""); 
  try {
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Login failed");

    loginUser({
      email: data.user.email,
      name: data.user.name,
      photo: data.user.photo || null
    });

    navigate(from, { replace: true });
  } catch (err) {
    setError(err.message);
  }
};


  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="input input-bordered w-full mb-3"
          required
        />
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input input-bordered w-full mb-3"
          required
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          type="submit"
          className="btn btn-success w-full"
        >
          Login
        </button>
      </form>

      <button
        onClick={googleLogin}
        className="btn btn-outline w-full mt-3"
      >
        Sign in with Google
      </button>

      <p className="text-sm mt-3 text-center">
        New here?{" "}
        <Link to="/register" className="text-green-700 font-semibold">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
