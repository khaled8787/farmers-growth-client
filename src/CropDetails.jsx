import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router";
import { AuthContext } from "./AuthProvider";
import { toast } from "react-toastify";

const CropDetails = () => {
  const { id } = useParams(); 
  const [crops, setCrops] = useState([]);
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:5000/crops")
      .then(res => res.json())
      .then(data => {
        setCrops(data);
        const found = data.find(c => c._id === parseInt(id));
        setCrop(found);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleInterest = () => {
    if (!user) {
      toast.error("Please login first!");
      return;
    }

    fetch(`http://localhost:5000/crops/${id}/interest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: user.email,
        userName: user.displayName,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message?.includes("already")) {
          toast.error("You already showed interest!");
        } else {
          toast.success("Interest added successfully!");
        }
      })
      .catch(() => toast.error("Something went wrong!"));
  };

  if (loading)
    return (
      <div className="text-center text-xl text-gray-500 mt-20">
        Loading crop details...
      </div>
    );

  if (!crop)
    return (
      <div className="text-center text-red-500 mt-20">
        Crop not found
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <img
          src={crop.image}
          alt={crop.name}
          className="w-full md:w-1/2 h-80 object-cover rounded-xl shadow-lg"
        />
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-green-800 mb-4">{crop.name}</h2>
          <p className="text-gray-700 mb-2"><strong>Type:</strong> {crop.type}</p>
          <p className="text-gray-700 mb-2">
            <strong>Price:</strong> ৳{crop.pricePerUnit} / {crop.unit}
          </p>
          <p className="text-gray-700 mb-2"><strong>Quantity:</strong> {crop.quantity}</p>
          <p className="text-gray-700 mb-2"><strong>Location:</strong> {crop.location}</p>
          <p className="text-gray-600 mt-4 leading-relaxed">{crop.description}</p>

          
          <button
            onClick={handleInterest}
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            I'm Interested
          </button>

          
          <Link
            to="/all-crops"
            className="inline-block mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            ← Back to All Crops
          </Link>

          
          {crop.interests && crop.interests.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Interested Buyers:</h3>
              <ul className="list-disc list-inside text-gray-700">
                {crop.interests.map((i, idx) => (
                  <li key={idx}>
                    {i.userName} ({i.userEmail})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropDetails;
