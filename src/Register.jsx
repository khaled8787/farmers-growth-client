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
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-green-50 to-green-100 dark:from-slate-950 dark:to-slate-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 animate-fadeIn border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-extrabold text-center text-green-700 dark:text-green-400 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            name="photoURL"
            type="text"
            placeholder="Photo URL"
            className="input input-bordered w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input input-bordered w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input input-bordered w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className={`btn btn-success w-full py-2 text-lg font-semibold hover:scale-105 transform transition-shadow shadow-md hover:shadow-xl ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            Register
          </button>
        </form>

        <div className="divider text-gray-400 dark:text-gray-500 my-4">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="text-white btn btn-outline w-full py-2 text-lg flex items-center justify-center gap-2 hover:scale-105 transform transition-shadow shadow-md hover:shadow-xl"
          disabled={loading}
        >
          <img
            src="https://media.istockphoto.com/id/2228661068/photo/isolated-google-logo-symbolizing-internet-search-and-technology.jpg?s=2048x2048&w=is&k=20&c=GkU1H8axd9pIdN--Sm6nGxn-MGJIGro6JVAzV07o5EQ="
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="text-sm mt-4 text-center text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 dark:text-green-400 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
