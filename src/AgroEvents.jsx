import React from "react";

const AgroEvents = () => {
  const events = [
    {
      id: 1,
      title: "Organic Farming Workshop",
      date: "2025-12-15",
      shortDescription: "Learn sustainable organic farming techniques from experts.",
      image: "https://images.pexels.com/photos/27529056/pexels-photo-27529056.jpeg",
    },
    {
      id: 2,
      title: "Agri-Tech Expo 2025",
      date: "2025-12-20",
      shortDescription: "Explore the latest agricultural technology and machinery.",
      image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg",
    },
    {
      id: 3,
      title: "Seasonal Crop Management Seminar",
      date: "2025-12-25",
      shortDescription: "Tips and tricks for maximizing yield this season.",
      image: "https://images.pexels.com/photos/6877977/pexels-photo-6877977.jpeg",
    },
    {
      id: 4,
      title: "Soil Health Awareness Camp",
      date: "2025-12-28",
      shortDescription: "Learn how to improve soil quality for better harvest.",
      image: "https://images.pexels.com/photos/7538361/pexels-photo-7538361.jpeg",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
        Upcoming Agricultural Events
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg text-green-700">{event.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{event.shortDescription}</p>
              <p className="text-gray-500 text-xs mt-1">Date: {new Date(event.date).toLocaleDateString()}</p>
              
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AgroEvents;
