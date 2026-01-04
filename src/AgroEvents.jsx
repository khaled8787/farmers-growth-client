import React from "react";
import { CalendarDays } from "lucide-react";

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
    <section className="relative py-20 bg-gradient-to-b from-green-50 to-white dark:from-slate-900 dark:to-slate-950 overflow-hidden">

      {/* Blur Background */}
      <div className="absolute -top-20 left-10 w-72 h-72 bg-green-300/30 dark:bg-green-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -right-20 w-80 h-80 bg-green-200/30 dark:bg-green-400/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">

        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white mb-4">
            Upcoming <span className="text-green-600 dark:text-green-400">Agro Events</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Stay updated with workshops, expos, and seminars shaping the future of agriculture.
          </p>
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 hover:rotate-[0.3deg]"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">
                  {event.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {event.shortDescription}
                </p>

                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium">
                  <CalendarDays size={16} />
                  {new Date(event.date).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AgroEvents;
