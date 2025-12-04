import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const LatestCrops = () => {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    fetch("https://farmer-growth-server.vercel.app/crops")
      .then((res) => res.json())
      .then((data) => {
        const latest = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6);

        setCrops(latest);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
        Latest Crops
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {crops.map((crop) => (
          <div
            key={crop._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300"
          >
            <img
              src={crop.image}
              alt={crop.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg text-green-700">
                {crop.name}
              </h3>
              <p className="text-gray-600 mt-1">
                Price: ৳{crop.pricePerUnit}/{crop.unit}
              </p>
              <p className="text-gray-500 text-sm mt-1">{crop.location}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link to="/all-crops">
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
            View All Crops
          </button>
        </Link>
      </div>
    </section>
  );
};

export default LatestCrops;
