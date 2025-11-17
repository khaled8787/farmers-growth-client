import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const FeaturedCrops = () => {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    fetch("https://farmer-growth-server.vercel.app/crops") 
      .then((res) => res.json())
      .then((data) => setCrops(data.slice(0, 4)))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
        Featured Crops
      </h2>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {crops.map((crop) => (
          <SwiperSlide key={crop._id}>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300">
              <img
                src={crop.image}
                alt={crop.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-green-700">{crop.name}</h3>
                <p className="text-gray-600 mt-1">Price: ৳{crop.pricePerUnit}/{crop.unit}</p>
                <p className="text-gray-500 text-sm mt-1">{crop.location}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeaturedCrops;
