import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router";
import { FaStar } from "react-icons/fa";

const CropDetails = () => {
  const { id } = useParams();
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { user } = useContext(AuthContext);

  const currentUserEmail = user?.email || null;
  const currentUserName = user?.displayName || "Unknown User";

  useEffect(() => {
    if (!id) return;
    fetch(`https://farmer-growth-server.vercel.app/crops/${id}`)
      .then(res => res.json())
      .then(data => {
        setCrop(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleInterest = () => {
    if (!currentUserEmail) return toast.error("Please login!");
    if (crop?.owner?.ownerEmail === currentUserEmail) {
      return toast.error("Cannot show interest in your own crop!");
    }

    fetch("https://farmer-growth-server.vercel.app/interests/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cropId: crop._id,
        cropName: crop.name,
        sellerEmail: crop.owner?.ownerEmail,
        buyerEmail: currentUserEmail,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data._id) toast.success("Interest added!");
        else toast.error(data.message || "Failed!");
      })
      .catch(() => toast.error("Server error"));
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!crop) return <div className="text-center mt-20 text-red-500">Crop not found</div>;

  return (
    <div className="max-w-7xl mx-auto mt-12 px-4">
      {/* Main Card */}
      <div className="flex flex-col lg:flex-row gap-10 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 transform hover:-translate-y-2 transition-transform duration-300">
        
        {/* Left: Image Gallery */}
        <div className="flex-1">
          <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg">
            {crop.images && crop.images.length > 0 ? (
              <img
                src={crop.images[selectedImage]}
                alt={crop.name}
                className="w-full h-full object-cover transition-transform duration-500 transform hover:scale-105"
              />
            ) : (
              <img
                src={crop.image}
                alt={crop.name}
                className="w-full h-full object-cover transition-transform duration-500 transform hover:scale-105"
              />
            )}
          </div>

          {/* Thumbnails */}
          {crop.images && crop.images.length > 1 && (
            <div className="flex mt-4 gap-3 overflow-x-auto">
              {crop.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`thumb-${idx}`}
                  className={`w-20 h-20 object-cover rounded-lg border-2 cursor-pointer transition-transform ${
                    selectedImage === idx ? "border-green-600 scale-105" : "border-gray-300 dark:border-gray-600"
                  }`}
                  onClick={() => setSelectedImage(idx)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-4xl font-extrabold text-green-700 dark:text-green-400">{crop.name}</h2>
          
          {/* Key Info */}
          <div className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
            <p><strong>Type:</strong> {crop.type}</p>
            <p><strong>Price:</strong> ৳{crop.pricePerUnit} / {crop.unit}</p>
            <p><strong>Quantity:</strong> {crop.quantity}</p>
            <p><strong>Location:</strong> {crop.location}</p>
            <p><strong>Status:</strong> 
              <span className={`ml-2 px-2 py-1 rounded-lg font-semibold ${
                crop.status === "available" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
              }`}>
                {crop.status}
              </span>
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 mt-6 leading-relaxed">{crop.description}</p>

          {/* Ratings (if any) */}
          {crop.rating && (
            <div className="mt-4 flex items-center gap-2">
              <p className="font-semibold text-gray-700 dark:text-gray-200">Rating:</p>
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`${
                    i < Math.round(crop.rating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
              <span className="ml-2 text-gray-600 dark:text-gray-400">{crop.rating.toFixed(1)}</span>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-8 flex gap-4 flex-wrap">
            <button
              onClick={handleInterest}
              className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition transform hover:scale-105"
            >
              I'm Interested
            </button>
            <Link
              to="/all-crops"
              className="bg-gray-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-700 transition transform hover:scale-105"
            >
              ← Back
            </Link>
          </div>

          {/* Interested Buyers */}
          {crop.interests?.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-3">Interested Buyers</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                {crop.interests.map((i, idx) => (
                  <li key={idx}>
                    <span className="font-semibold">{i.userName}</span> (<span className="text-gray-500">{i.userEmail}</span>) — <span className="font-semibold capitalize">{i.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Crops (Optional) */}
          {crop.relatedCrops?.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-3">Related Crops</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {crop.relatedCrops.map((r) => (
                  <Link
                    key={r._id}
                    to={`/crops/${r._id}`}
                    className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow hover:shadow-2xl transition transform hover:-translate-y-2"
                  >
                    <img src={r.images?.[0] || r.image} alt={r.name} className="w-full h-32 object-cover rounded-lg mb-2" />
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200">{r.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">৳{r.pricePerUnit}/{r.unit}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropDetails;
