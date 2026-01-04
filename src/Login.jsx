import { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { Link, useLocation, useNavigate } from "react-router";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "./firebase.config";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const handleGoogle = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      loginUser({
        email: user.email,
        name: user.displayName,
        photo: user.photoURL || null,
      });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      loginUser({
        email: user.email,
        name: user.displayName,
        photo: user.photoURL || null,
      });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  // 🔥 DEMO USER LOGIN
  const handleDemoLogin = async () => {
    setError("");
    const demoEmail = "fatemaafrinsimu@gmail.com";
    const demoPassword = "Khaled1@";

    try {
      setEmail(demoEmail);
      setPassword(demoPassword);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        demoEmail,
        demoPassword
      );
      const user = userCredential.user;

      loginUser({
        email: user.email,
        name: user.displayName,
        photo: user.photoURL || null,
      });

      navigate(from, { replace: true });
    } catch (err) {
      setError("Demo login failed!");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-green-50 to-green-100 dark:from-slate-950 dark:to-slate-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 animate-fadeIn border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-extrabold text-center text-green-700 dark:text-green-400 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input input-bordered w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input input-bordered w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="btn btn-success w-full py-2 text-lg font-semibold hover:scale-105 transform transition-shadow shadow-md hover:shadow-xl"
          >
            Login
          </button>
        </form>

        {/* 🔘 DEMO USER BUTTON */}
        <button
          onClick={handleDemoLogin}
          className="btn w-full mt-3 bg-gray-800 hover:bg-gray-900 text-white py-2 text-lg font-semibold hover:scale-105 transform transition-shadow shadow-md hover:shadow-xl"
        >
          Login as Demo User
        </button>

        <div className="divider text-gray-400 dark:text-gray-500 my-4">OR</div>

        <button
          onClick={handleGoogle}
          className="btn btn-outline w-full py-2 text-lg flex items-center justify-center gap-2 hover:scale-105 transform transition-shadow shadow-md hover:shadow-xl"
        >
          <img
            src="https://media.istockphoto.com/id/2228661068/photo/isolated-google-logo-symbolizing-internet-search-and-technology.jpg?s=2048x2048&w=is&k=20&c=GkU1H8axd9pIdN--Sm6nGxn-MGJIGro6JVAzV07o5EQ="
            alt="Google"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>

        <p className="text-sm mt-4 text-center text-gray-600 dark:text-gray-300">
          New here?{" "}
          <Link to="/register" className="text-green-700 dark:text-green-400 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
