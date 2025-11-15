import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router";

const CropDetails = () => {
  const { id } = useParams();
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const currentUserEmail = user?.email || null;
  const currentUserName = user?.displayName || "Unknown User";
  console.log(id)
  useEffect(() => {
    if (!id) return; 
    fetch(`http://localhost:5000/crops/${id}`)
      .then(res => res.json())
      .then(data => { setCrop(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const handleInterest = () => {
  if (!currentUserEmail) {
    toast.error("Please login!");
    return;
  }

  if (crop?.owner?.ownerEmail === currentUserEmail) {
    toast.error("Cannot show interest in your own crop!");
    return;
  }

  fetch("http://localhost:5000/interests/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cropId: crop._id,
      cropName: crop.name,
      sellerEmail: crop.owner?.ownerEmail,
      buyerEmail: currentUserEmail,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data._id) {
        toast.success("Interest added!");
      } else {
        toast.error(data.message || "Failed!");
      }
    })
    .catch(() => toast.error("Server error"));
};


  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!crop) return <div className="text-center mt-20 text-red-500">Crop not found</div>;

  return (
    <div className="max-w-6xl mx-auto mt-12 px-4">
      <div className="flex flex-col md:flex-row gap-10 bg-white p-6 rounded-xl shadow-lg border">
        <img src={crop.image} alt={crop.name} className="w-full md:w-1/2 h-96 object-cover rounded-xl shadow-md" />
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-green-800">{crop.name}</h2>
          <div className="space-y-2 mt-4 text-gray-700">
            <p><strong>Type:</strong> {crop.type}</p>
            <p><strong>Price:</strong> ৳{crop.pricePerUnit} / {crop.unit}</p>
            <p><strong>Quantity:</strong> {crop.quantity}</p>
            <p><strong>Location:</strong> {crop.location}</p>
          </div>
          <p className="text-gray-600 mt-4 leading-relaxed">{crop.description}</p>
          <div className="mt-8 flex items-center gap-4">
            <button onClick={handleInterest} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 shadow transition">I'm Interested</button>
            <Link to="/all-crops" className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 shadow transition">← Back</Link>
          </div>

          {crop.interests?.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-green-800 mb-3">Interested Buyers</h3>
              <ul className="space-y-2">
                {crop.interests.map((i, idx) => (
                  <li key={idx} className="text-gray-700">
                    <span className="font-semibold">{i.userName}</span> (<span className="text-gray-600">{i.userEmail}</span>) — <span className="font-semibold capitalize">{i.status}</span>
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
