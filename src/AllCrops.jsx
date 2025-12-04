import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const AllCrops = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://farmer-growth-server.vercel.app/crops")
      .then(res => res.json())
      .then(data => {
        const sorted = (data || []).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setCrops(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!crops.length) return <div className="text-center mt-20">No crops found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">All Crops</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {crops.map(crop => (
          <div key={crop._id} className="bg-white shadow-lg rounded-lg overflow-hidden border">
            <img src={crop.image} alt={crop.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-green-700">{crop.name}</h3>
              <p>{crop.type} | {crop.quantity} {crop.unit}</p>
              <Link to={`/crops/${crop._id}`}>
                <button className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow transition">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCrops;
