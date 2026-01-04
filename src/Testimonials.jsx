import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rahim Uddin",
      role: "Farmer",
      feedback: "KrishiLink helped me sell my crops directly to buyers and earn fair prices. Truly a game-changer!",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Fatema Afrin",
      role: "Farmer",
      feedback: "Thanks to KrishiLink, I reached more buyers than ever. The platform is reliable and easy to use.",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Jahid Hasan",
      role: "Farmer",
      feedback: "I love the transparency and support from the KrishiLink team. Highly recommended for small farmers.",
      photo: "https://randomuser.me/api/portraits/men/65.jpg",
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-green-50 to-white dark:from-slate-900 dark:to-slate-950 overflow-hidden">
      <div className="absolute top-10 -left-20 w-72 h-72 bg-green-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -right-20 w-80 h-80 bg-green-200/30 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-4">
            Farmer <span className="text-green-600">Testimonials</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Hear from farmers who trusted KrishiLink to grow their business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="group bg-white dark:bg-slate-900 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 hover:rotate-[0.4deg]"
            >
              <img
                src={t.photo}
                alt={t.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-green-600"
              />
              <h3 className="text-lg font-semibold text-green-700 mb-1">{t.name}</h3>
              <p className="text-gray-400 text-sm mb-3">{t.role}</p>
              <p className="text-gray-400 text-sm">{t.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
