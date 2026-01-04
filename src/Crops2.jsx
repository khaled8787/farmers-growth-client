import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { MapPin, Leaf } from "lucide-react";

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
    <section className="relative py-20 bg-gradient-to-b from-white to-green-50 dark:from-slate-950 dark:to-slate-900 overflow-hidden">

      {/* Background blur effects */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-300/30 dark:bg-green-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-green-200/30 dark:bg-green-400/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">

        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white mb-4">
            Latest <span className="text-green-600 dark:text-green-400">Crops</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Discover the freshest crops directly from trusted farmers across the country.
          </p>
        </div>

        {/* Crop Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {crops.map((crop) => (
            <div
              key={crop._id}
              className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 hover:rotate-[0.4deg]"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={crop.images[0]}
                  alt={crop.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2 text-green-600 dark:text-green-400">
                  <Leaf size={18} />
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                    {crop.name}
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Price: <span className="font-medium">৳{crop.pricePerUnit}</span> / {crop.unit}
                </p>

                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                  <MapPin size={16} />
                  <span>{crop.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link to="/all-crops">
            <button className="px-8 py-3 rounded-full bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 hover:shadow-xl transition transform hover:-translate-y-1">
              View All Crops
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default LatestCrops;
