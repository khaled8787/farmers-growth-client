import { Link } from "react-router";

const NotFound = () => (
  <div className="text-center mt-20">
    <h1 className="text-5xl font-bold text-green-700">404</h1>
    <p className="text-gray-600 mb-6">Page Not Found</p>
    <Link to="/" className="text-white bg-green-600 px-4 py-2 rounded">
      Go Home
    </Link>
  </div>
);

export default NotFound;
