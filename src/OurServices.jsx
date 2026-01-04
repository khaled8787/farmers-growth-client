import React from "react";

const services = [
  {
    icon: "🌾",
    title: "Fresh Farm Produce",
    desc: "Directly sourced from verified farmers, ensuring freshness and quality."
  },
  {
    icon: "🛒",
    title: "Easy Ordering",
    desc: "Order your crops easily through our platform with secure payment options."
  },
  {
    icon: "🚛",
    title: "Fast Delivery",
    desc: "Quick and reliable delivery right to your doorstep."
  },
  {
    icon: "📊",
    title: "Market Insights",
    desc: "Get real-time data and insights to make informed decisions."
  },
];

const OurServices = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-green-50 dark:from-slate-950 dark:to-slate-900 overflow-hidden">

      {/* Background Blur Shapes */}
      <div className="absolute top-10 -left-20 w-72 h-72 bg-green-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -right-20 w-80 h-80 bg-green-200/30 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Our <span className="text-green-600">Services</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            We provide a range of services to connect farmers with buyers efficiently and transparently.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, idx) => (
            <div
              key={idx}
              className="group bg-white dark:bg-slate-900 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 hover:rotate-[0.4deg]"
            >
              {/* Icon */}
              <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
                {s.icon}
              </div>

              {/* Title */}
              <h3 className="text-white font-semibold text-lg mb-2">{s.title}</h3>

              {/* Description */}
              <p className="text-gray-400 text-sm">{s.desc}</p>

              {/* Bottom Glow Line */}
              <div className="mt-5 h-1 w-10 mx-auto rounded-full bg-green-500/0 group-hover:bg-green-500 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
