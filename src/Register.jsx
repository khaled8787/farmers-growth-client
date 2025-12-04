import { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Register = () => {
  const { createUser, updateUserProfile, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasMinLength = password.length >= 6;
    if (!hasUppercase) return "Password must contain at least one uppercase letter";
    if (!hasLowercase) return "Password must contain at least one lowercase letter";
    if (!hasMinLength) return "Password must be at least 6 characters long";
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const name = e.target.name.value.trim();
    const photoURL = e.target.photoURL.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    if (!name || !photoURL || !email || !password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUser(email, password);
      await updateUserProfile({ displayName: name, photoURL });
      toast.success("Registration successful!");
      setLoading(false);
      navigate("/"); 
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await googleLogin();
      toast.success("Logged in with Google!");
      setLoading(false);
      navigate("/");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          className="input input-bordered w-full"
        />
        <input
          name="photoURL"
          type="text"
          placeholder="Photo URL"
          className="input input-bordered w-full"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className={`btn btn-success w-full ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          Register
        </button>
      </form>

      <div className="divider">OR</div>

      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline w-full flex items-center justify-center gap-2"
        disabled={loading}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt="Google"
          className="w-5 h-5"
        />
        Continue with Google
      </button>

      <p className="text-sm mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-green-700 font-semibold">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
