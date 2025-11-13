import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router";
import { AuthContext } from "./AuthProvider";
import { toast } from "react-toastify";

const CropDetails = () => {
  const { id } = useParams();
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const currentUserEmail = "test@gmail.com";
  const currentUserName = "Test User";

  useEffect(() => {
    fetch(`http://localhost:5000/crops/${id}`)
      .then(res => res.json())
      .then(data => { setCrop(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const handleInterest = () => {
    if (!currentUserEmail) { toast.error("Login required!"); return; }

    if ((crop.interests || []).some(i => i.userEmail === currentUserEmail)) {
      toast.error("Already showed interest!"); return;
    }

    fetch(`http://localhost:5000/crops/${id}/interest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: currentUserEmail,
        userName: currentUserName,
        quantity: 1,
        message: "I am interested in this crop"
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.interest) {
        setCrop(prev => ({
          ...prev,
          interests: [...(prev.interests || []), data.interest]
        }));
        toast.success("Interest added!");
      } else {
        toast.error(data.message || "Failed to add interest.");
      }
    })
    .catch(() => toast.error("Server error!"));
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!crop) return <div className="text-center mt-20 text-red-500">Crop not found.</div>;

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <img src={crop.image} alt={crop.name} className="w-full md:w-1/2 h-80 object-cover rounded-xl shadow-lg" />
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-green-800">{crop.name}</h2>
          <p className="text-gray-700"><strong>Type:</strong> {crop.type}</p>
          <p className="text-gray-700"><strong>Price:</strong> ৳{crop.pricePerUnit} / {crop.unit}</p>
          <p className="text-gray-700"><strong>Quantity:</strong> {crop.quantity}</p>
          <p className="text-gray-700"><strong>Location:</strong> {crop.location}</p>
          <p className="text-gray-600 mt-4">{crop.description}</p>

          <button onClick={handleInterest} className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">I'm Interested</button>
          <Link to="/all-crops" className="ml-3 inline-block mt-6 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700">← Back</Link>

          {crop.interests?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-green-800">Interested Buyers:</h3>
              <ul className="list-disc list-inside">
                {crop.interests.map((i, idx) => (
                  <li key={idx}>{i.userName} ({i.userEmail}) — Status: <span className="font-semibold">{i.status}</span></li>
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
